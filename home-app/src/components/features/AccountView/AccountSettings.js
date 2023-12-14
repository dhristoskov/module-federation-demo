import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import IconTextTitle from '@/components/elements/IconTextTitle/IconTextTitle'
import BaseIconButton from '@/components/elements/BaseIconButton/BaseIconButton'

const UserAccount = dynamic(() => import('remote/UserAccount'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const AccountSettings = ({ selected, setSelected }) => {
  const renderPageTitle = () => {
    switch (selected) {
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
      case 'messages':
        return (
          <IconTextTitle
            icon="mail"
            text="Message Centre"
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
    <div className="col-span-full col-start-1 py-8 px-5">
      <div className="flex flex-col md:flex-row w-full justify-between md:items-center mb-5">
        {renderPageTitle()}
        <BaseIconButton
          icon="arrow-left"
          size="lg"
          title='Back to "My Account"'
          onClick={() => setSelected(null)}
        />
      </div>
      <UserAccount selected={selected} />
    </div>
  )
}

export default AccountSettings
