import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import MainLayout from '@/components/elements/Layout/MainLayout/MainLayout'
import AccountView from '@/components/features/AccountView/AccountView'
import PopularProducts from '@/components/features/Products/PopularProducts/PopularProducts'
import { fetchAPI } from '@/lib/api'

const Account = ({ products }) => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const storedData = JSON.parse(localStorage.getItem('userData'))
  const token = storedData && storedData.token

  const formattedProducts = products.map((product) => {
    return {
      id: product.id,
      title: product?.attributes?.title,
      price: product?.attributes?.price,
      onSale: product?.attributes?.onSale,
      discount: product?.attributes?.discount,
      image: product?.attributes?.image,
      slug: product?.attributes?.slug,
    }
  })

  const productsNotOnSale = formattedProducts.filter((product) => product.onSale === false)

  useEffect(() => {
    setIsLoggedIn(token)
    if (!token) {
      router.push({ pathname: '/' }, undefined, { shallow: true })
    }
  }, [])

  return (
    isLoggedIn && (
      <MainLayout>
        <div className="col-span-full col-start-1">
          <div className="text-2xl font-bold text-gray-800 mb-8">Your Account Options</div>
          <AccountView />
          <PopularProducts products={productsNotOnSale} />
        </div>
      </MainLayout>
    )
  )
}

export const getStaticProps = async () => {
  const products = await fetchAPI('/products')

  return {
    props: {
      products: products?.data || [],
    },
    revalidate: 1,
  }
}

export default Account
