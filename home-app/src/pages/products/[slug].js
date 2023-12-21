import React from 'react'

import { fetchAPI } from '@/lib/api'

const Product = ({ product }) => {
    console.log(product)
    return (
        <div>
            <h1>{product.attributes.slug}</h1>
        </div>
    )
}

export default Product

export const getStaticPaths = async () => {
  const products = await fetchAPI('/products', { fields: ['slug'] })

  return {
    paths: products.data.map((product) => ({
      params: {
        slug: product.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const products = await fetchAPI('/products', {
    filters: {
      slug: params.slug,
    },
  })

  return {
    props: { product: products.data[0] },
    revalidate: 1,
  }
}
