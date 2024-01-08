import Typography from '@/components/elements/Typography/Typography'
import React from 'react'

const BasketModal = () => {
  const onRemove = () => {
    localStorage.removeItem('basket')
    const event = new CustomEvent('basket-available', { detail: false })
    window.dispatchEvent(event)
  }

  const onKeep = () => {
    // add the content of the local storage to backet in the db
    console.log('keep')
  }

  return (
    <div className="min-h-[12rem] p-5 my-5 flex flex-col gap-2 items-center w-full">
      <Typography additionalClasses="text-lg font-bold text-red-500 w-full text-center">
        Un-logged (Guest) user - cart contains prododucts
      </Typography>
      <Typography additionalClasses="text-sm font-bold text-slite-900 w-full text-center">
        Would you like to keep them in your cart or remove it
      </Typography>
      <div className="w-full flex justify-center gap-8 items-center mt-6 mb-3">
        <button
          onClick={onKeep}
          className="bg-slate-900 text-slate-100 rounded-3xl min-w-[6rem] py-2 mr-2"
        >
          Keep
        </button>
        <button
          onClick={onRemove}
          className="bg-red-500 text-slate-100 rounded-3xl min-w-[6rem] py-2"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default BasketModal
