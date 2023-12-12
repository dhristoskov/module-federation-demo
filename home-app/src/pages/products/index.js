// It is index file for products page teporary. It will be changed in the [..id].js file.
import React from 'react'

import MainLayout from '@/components/elements/Layout/MainLayout/MainLayout'
import ProductsOnSale from '@/components/features/Products/ProductsOnSale/ProductsOnSale'
import ProductDetail from '@/components/features/Products/ProductDetail/ProductDetail'
import { fetchAPI } from '@/lib/api'

const Products = ({ products }) => {
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

  const productsOnSale = formattedProducts.filter((product) => product.onSale === true)

  return (
    <MainLayout>
      <div className="col-span-full col-start-1">
        <ProductDetail />
        <ProductsOnSale products={productsOnSale} />
      </div>
    </MainLayout>
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

export default Products
