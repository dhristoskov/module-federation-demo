import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import Footer from '@/components/features/Footer/Footer'
import Header from '@/components/features/Header/Header'
import Breakpoints from '@/components/foundations/Breakpoints/Breakpoints'
import Notification from '@/components/elements/Notification/Notification'
import InfoHeader from '@/components/features/InfoHeader/InfoHeader'
import Modal from '@/components/elements/Modal/Modal'
import AccountCtA from '@/components/modules/AccountCtA/AccountCtA'
import AccountModal from '@/components/features/AccountModal/AccountModal'
import { NotificationContext } from 'remote/storeNotification'
import { AuthContext } from 'remote/storeAuth'

const Auth = dynamic(() => import('remote/Auth'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const MainLayout = ({ tag = 'section', children, categories }) => {
  const { activeNotification } = useContext(NotificationContext)
  const { isLoggedIn } = useContext(AuthContext)
  const [auth, setAuth] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)

  const Tag = tag

  const onModalClose = () => {
    setAuth(false)
  }

  const toggleAccountModal = () => {
    setShowAccountModal(!showAccountModal)
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
      <Modal
        isOpen={auth}
        onClose={onModalClose}
      >
        <Auth />
      </Modal>
      {isLoggedIn && <AccountCtA onClick={toggleAccountModal} />}
      {isLoggedIn && (
        <AccountModal
          isOpen={showAccountModal}
          onClick={toggleAccountModal}
        />
      )}
      <main className="relative">
        <Notification activeNotification={activeNotification} />
        <Header categories={categories} />
        <InfoHeader />
        <section className="my-16">
          <Breakpoints tag={tag}>{children}</Breakpoints>
        </section>
        <Footer />
      </main>
    </>
  )
}

export default MainLayout
