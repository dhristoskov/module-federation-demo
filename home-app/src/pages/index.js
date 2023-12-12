import React from 'react'

import Faq from '@/components/features/Faq/Faq'
import Category from '@/components/features/Products/Category/Category'
import MainLayout from '@/components/elements/Layout/MainLayout/MainLayout'
import PopularProducts from '@/components/features/Products/PopularProducts/PopularProducts'
import ProductsOnSale from '@/components/features/Products/ProductsOnSale/ProductsOnSale'
import { fetchAPI } from '@/lib/api'

const Home = ({ products, faqs, categories }) => {
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
  const productsNotOnSale = formattedProducts.filter((product) => product.onSale === false)

  return (
    <MainLayout categories={categories}>
      <div className="col-span-full col-start-1">
        <PopularProducts products={productsNotOnSale} />
        <ProductsOnSale products={productsOnSale} />
        <Category categories={categories} />
        <Faq faqs={faqs} />
      </div>
    </MainLayout>
  )
}

export const getStaticProps = async () => {
  const [products, faqs, categories] = await Promise.all([
    fetchAPI('/products'),
    fetchAPI('/faqs'),
    fetchAPI('/categories'),
  ])

  return {
    props: {
      products: products?.data || [],
      faqs: faqs?.data || [],
      categories: categories?.data || [],
    },
    revalidate: 1,
  }
}

export default Home
