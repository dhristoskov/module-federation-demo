import React, { useState } from 'react'
import Image from 'next/image'
import Typography from '@/components/elements/Typography/Typography'

const DUMMY_DATA = [
  {
    id: 1,
    products: [
      {
        id: 51,
        name: 'Product 1',
        price: 10.99,
        quantity: 1,
        image: 'https://placehold.co/200x200?text=Placeholder&font=roboto',
      },
      {
        id: 42,
        name: 'Product 2',
        price: 22.95,
        quantity: 2,
        image: 'https://placehold.co/200x200?text=Placeholder&font=roboto',
      },
    ],
    total: 33.89,
    status: 'pending',
    date: '12.12.2023',
  },
  {
    id: 2,
    products: [
      {
        id: 31,
        name: 'Product 11',
        price: 10.99,
        quantity: 1,
        image: 'https://placehold.co/200x200?text=Placeholder&font=roboto',
      },
      {
        id: 22,
        name: 'Product 21',
        price: 22.95,
        quantity: 2,
        image: 'https://placehold.co/200x200?text=Placeholder&font=roboto',
      },
    ],
    total: 33.89,
    status: 'delivered',
    date: '13.12.2023',
  },
  {
    id: 3,
    products: [
      {
        id: 11,
        name: 'Product 15',
        price: 10.99,
        quantity: 1,
        image: 'https://placehold.co/200x200?text=Placeholder&font=roboto',
      },
      {
        id: 12,
        name: 'Product 27',
        price: 22.95,
        quantity: 2,
        image: 'https://placehold.co/200x200?text=Placeholder&font=roboto',
      },
    ],
    total: 33.89,
    status: 'delivered',
    date: '14.12.2023',
  },
]

const UserOrders = () => {
  const [selected, setSelected] = useState(null)

  return (
    <section className="flex flex-col gap-5 w-full">
      {DUMMY_DATA.map((order) => (
        <div
          key={order.id}
          className="flex items-center w-full py-1 px-2 shadow-xl rounded-md border-2 border-slate-200"
        >
          <div className="flex items-center gap-3 w-[60%]">
            {order.products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelected(product)}
                className="relative"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="cursor-pointer"
                />
                {selected?.id === product.id && (
                  <div
                    onMouseLeave={() => setSelected(null)}
                    className="absolute border-2 border-slate-200 w-full p-2 shadow-2xl z-40 bottom-16 left-[4rem] bg-white min-w-[25rem] flex gap-5"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                    />
                    <div className="flex flex-col">
                      <Typography additionalClasses="text-sm font-bold">{product.name}</Typography>
                      <Typography additionalClasses="text-sm font-bold">price:€ {product.price}</Typography>
                      <Typography additionalClasses="text-sm font-bold">qty: {product.quantity}</Typography>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex w-[40%] items-center justify-between">
            <div className="flex flex-col gap-1">
              <Typography additionalClasses="text-sm font-bold">Total price:</Typography>
              <Typography additionalClasses="text-md text-slate-600">{order.total}</Typography>
            </div>
            <div className="flex flex-col gap-1">
              <Typography additionalClasses="text-sm font-bold">Order status:</Typography>
              <Typography additionalClasses="text-md text-slate-600">{order.status}</Typography>
            </div>
            <div className="flex flex-col gap-1">
              <Typography additionalClasses="text-sm font-bold">Order date:</Typography>
              <Typography additionalClasses="text-md text-slate-600">{order.date}</Typography>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default UserOrders
