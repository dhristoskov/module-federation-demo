import React, { useContext, useState } from 'react'
import dynamic from 'next/dynamic'

import MainLayout from '@/components/elements/Layout/MainLayout/MainLayout'
import AdditionalOptions from '@/components/features/AdditionalOptions/AdditionalOptions'
import { AuthContext } from 'remote/storeAuth'

const Checkoput = dynamic(() => import('remote/Checkout'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const Products = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <MainLayout>
      <section className="col-span-full col-start-1">
        <section className="flex">
          <div className="flex flex-col flex-1">
            <Checkoput
              isLoggedIn={isLoggedIn}
              setSelectedOptions={setSelectedOptions}
            />
            <AdditionalOptions />
          </div>
          <div className="flex flex-col flex-1">
            <p>Payment</p>
          </div>
        </section>
      </section>
    </MainLayout>
  )
}

export default Products

export const getServersideProps = async (ctx) => {
  const checkout = await import('remote/Checkout')

  if (checkout.getServersideProps) {
    return await checkout.getServersideProps(ctx)
  }

  return {
    props: {},
  }
}
