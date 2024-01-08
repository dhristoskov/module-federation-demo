import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Typography from '@/components/elements/Typography/Typography'
import BaseIconButton from '@/components/elements/BaseIconButton/BaseIconButton'
import useAuth from '@/hooks/useAuth'

const Basket = dynamic(() => import('remote/Basket'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const CartDropDown = () => {
  const { isLoggedIn } = useAuth()
  const [open, setOpen] = useState(false)
  const [localStorageBasketAvailable, setLocalStorageBasketAvailable] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const basket = localStorage.getItem('basket')
    if (basket && isLoggedIn) {
      setLocalStorageBasketAvailable(true)
    } else {
      setLocalStorageBasketAvailable(false)
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn && localStorageBasketAvailable) {
      const event = new CustomEvent('basket-available', { detail: localStorageBasketAvailable })
      window.dispatchEvent(event)
    }
  }, [localStorageBasketAvailable])

  return (
    <div className="relative">
      <BaseIconButton
        icon="shopping-cart"
        size="md"
        onClick={toggleOpen}
        onMouseEnter={() => setOpen(true)}
        buttonClassName="min-w-[1.6rem]"
      />
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute border-2 border-slate-200 shadow-2xl z-20 top-8 right-0 bg-white w-[22rem] min-h-[20rem]"
        >
          <Basket>
            <>
              <Link
                href="/checkout"
                className="w-full"
              >
                <p className="border-2 border-slate-900 rounded-3xl text-slate-100 bg-slate-900 p-2 mb-5 mt-5 text-center">
                  Checkout
                </p>
              </Link>
              <Typography additionalClasses="text-xs/[10px] mb-5 text-slate-500">
                The price and availability of items at our web-page are subject to change. The shopping cart is a
                temporary place to store a list of your items and reflects each item's most recent price.
              </Typography>
            </>
          </Basket>
        </div>
      )}
    </div>
  )
}

export default CartDropDown

export const getServersideProps = async (ctx) => {
  const cart = await import('remote/Cart')

  if (cart.getServersideProps) {
    return await cart.getServersideProps(ctx)
  }

  return {
    props: {},
  }
}
