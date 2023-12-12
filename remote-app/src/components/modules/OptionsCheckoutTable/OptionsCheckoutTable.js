import React from 'react'
import Image from 'next/image'

import Typography from '@/components/elements/Typography/Typography'

const OptionsCheckoutTable = ({ options, price, deleteOptionFromBasket }) => {
  return (
    options?.length > 0 && (
      <div className="flex flex-col mt-10">
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <div
              key={option.id}
              className="w-full max-w-[38rem] flex justify-between items-center py-2 gap-4"
            >
              <Image
                loading="eager"
                priority={true}
                src={option.image}
                alt={option.title}
                width={0}
                height={0}
                style={{ width: 'auto', height: '60px' }}
              />
              <div className="flex items-center justify-between w-[65%]">
                <div className="flex flex-col gap-2">
                  <Typography additionalClasses="text-md font-bold">{option.title}</Typography>
                  <p
                    onClick={() => deleteOptionFromBasket(option)}
                    className="text-sm text-red-700 cursor-pointer"
                  >
                    Delete Item
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <Typography additionalClasses="text-md font-bold text-slate-900">€ {option.price}</Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between items-center w-full max-w-[38rem] mt-10 border-t-2 border-slate-900 pt-2">
          <Typography additionalClasses="text-md text-slate-500">Cart Total</Typography>
          <Typography additionalClasses="text-md font-bold text-slate-900">€ {price}</Typography>
        </div>
      </div>
    )
  )
}

export default OptionsCheckoutTable
