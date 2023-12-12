import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import Footer from '@/components/features/Footer/Footer'
import Header from '@/components/features/Header/Header'
import Breakpoints from '@/components/foundations/Breakpoints/Breakpoints'
import Notification from '@/components/elements/Notification/Notification'
import InfoHeader from '@/components/features/InfoHeader/InfoHeader'
import Modal from '@/components/elements/Modal/Modal'
import { NotificationContext } from 'remote/storeNotification'
import { AuthContext } from 'remote/storeAuth'

const Auth = dynamic(() => import('remote/Auth'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const MainLayout = ({ tag = 'section', children }) => {
  const { activeNotification } = useContext(NotificationContext)
  const { isLoggedIn } = useContext(AuthContext)
  const [auth, setAuth] = useState(false)

  const Tag = tag

  const onModalClose = () => {
    setAuth(false)
  }

  useEffect(() => {
    window.addEventListener('auth', () => {
      setAuth(true)
    })
    return () => {
      window.removeEventListener('auth', () => {})
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      setAuth(false)
    }
  }, [isLoggedIn])

  return (
    <>
      {auth && (
        <Modal onClose={onModalClose}>
          <Auth />
        </Modal>
      )}
      <main className="relative">
        <Notification activeNotification={activeNotification} />
        <Header />
        <InfoHeader />
        <section className="my-16">
          <Breakpoints tag={tag}>{children}</Breakpoints>
        </section>
        <Footer />
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const auth = await import('remote/Auth')

  if (auth.getServersideProps) {
    return await auth.getServersideProps(ctx)
  }

  return {
    props: {},
  }
}

export default MainLayout
