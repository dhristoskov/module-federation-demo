import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import MainLayout from '@/components/elements/Layout/MainLayout/MainLayout'
import AdditionalOptions from '@/components/features/AdditionalOptions/AdditionalOptions'
import { fetchAPI } from '@/lib/api'
import Head from 'next/head'

const Checkout = dynamic(() => import('remote/Checkout'), {
  ssr: false,
  suspense: true,
})

const CheckoutUserInfo = dynamic(() => import('remote/CheckoutUserInfo'), {
  ssr: false,
  suspense: true,
})

const Products = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [isBasketEmpty, setIsBasketEmpty] = useState(true)
  const router = useRouter()

  const continueShopping = () => {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <MainLayout>
        <section className="col-span-full col-start-1">
          <section className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col flex-1 min-h-[36rem]">
              <Checkout
                continueShopping={continueShopping}
                setIsBasketEmpty={setIsBasketEmpty}
                setSelectedOptions={setSelectedOptions}
              />
              {!isBasketEmpty && (
                <AdditionalOptions
                  options={options}
                  selectedOptions={selectedOptions}
                />
              )}
            </div>
            <div className="flex flex-col flex-1">
              <CheckoutUserInfo />
            </div>
          </section>
        </section>
      </MainLayout>
    </>
  )
}

export default Products

export const getStaticProps = async () => {
  const options = await fetchAPI('/options')

  return {
    props: {
      options: options?.data || [],
    },
    revalidate: 1,
  }
}
