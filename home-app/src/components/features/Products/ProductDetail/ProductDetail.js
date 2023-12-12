import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const AddProductButton = dynamic(() => import('remote/AddProductButton'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const ProductDetail = () => {
  return (
    <section className="w-full flex justify-between flex-wrap">
      <div className='flex-1'>
      <Image
          loading="eager"
          priority={true}
          src={'https://dearbear.eu/wp-content/uploads/2019/11/Koala-100cm.jpg'}
          alt={'Koala 100 cm'}
          width={0}
          height={0}
          style={{ width: 'auto', height: '550px' }}
        />
      </div>
      <div className='flex-1'>
        <div>size</div>
        <div>Koala 100 cm</div>
        <AddProductButton
          title="Add to cart"
          product={null}
        />
        <div>Weight: 2.15 kg Package dimensions: 45 x 35 x 65 cm</div>
        <p>EAN: 5904165603210</p>
      </div>
    </section>
  )
}

export default ProductDetail
