import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

import MainLayout from '@/components/elements/Layout/MainLayout/MainLayout'
import IconTextTitle from '@/components/elements/IconTextTitle/IconTextTitle'

const UserAccount = dynamic(() => import('remote/UserAccount'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const AccountSettings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [slug, setSlug] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    const token = storedData && storedData.token
    setIsLoggedIn(token)
    if (!token) {
      router.push({pathname: '/'}, undefined, { shallow: true})
    }
  }, [])

  useEffect(() => {
    if (!searchParams) return
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const search = current.toString()
    const param = search.split('=')
    setSlug(param[1])
  }, [searchParams])

  const renderPageTitle = () => {
    switch (slug) {
      case 'orders':
        return (
          <IconTextTitle
            icon="package"
            text="Your Orders"
          />
        )
      case 'security':
        return (
          <IconTextTitle
            icon="lock"
            text="Edit you login and security details"
          />
        )
      case 'addresses':
        return (
          <IconTextTitle
            icon="map-marker"
            text="Edit, add or remove address"
          />
        )
      case 'payments':
        return (
          <IconTextTitle
            icon="money-stack"
            text="Your Payments"
          />
        )
      case 'gift-cards':
        return (
          <IconTextTitle
            icon="coin"
            text="Gift Cards & Top Up"
          />
        )
      case 'messages':
        return (
          <IconTextTitle
            icon="mail"
            text="Message Centre"
          />
        )
      case 'contact':
        return (
          <IconTextTitle
            icon="headphone"
            text="Contact Us"
          />
        )
      case 'favorites':
        return (
          <IconTextTitle
            icon="heart"
            text="Your Favorites"
          />
        )
    }
  }

  return (
    isLoggedIn && (
      <MainLayout>
        <div className="col-span-full col-start-1">
          {renderPageTitle()}
          <UserAccount selected={slug} />
        </div>
      </MainLayout>
    )
  )
}

export default AccountSettings

export const getServersideProps = async (ctx) => {
  const userAccount = await import('remote/UserAccount')

  if (userAccount.getServersideProps) {
    return await userAccount.getServersideProps(ctx)
  }

  return {
    props: {},
  }
}
