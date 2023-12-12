import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import Typography from '@/components/elements/Typography/Typography'
import BaseIcon from '@/components/elements/BaseIcon/BaseIcon'

const AddOption = dynamic(() => import('remote/AddOption'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const OptionsList = ({ options, sectionTitle, selected, onSelect }) => {
  const selectedClass = 'border-slate-900'

  return (
    <div className="flex gap-3">
      <div className="max-w-[1rem]">
        <Typography additionalClasses="text-lg font-bold transform rotate-90">{sectionTitle}</Typography>
      </div>
      <div className="flex items-center gap-6">
        {options.map((option) => (
          <div
            key={option.id}
            id={sectionTitle}
            className="relative"
          >
            <div
              className={`cursor-pointer border-2 ${selected === option.id ? selectedClass : ''}`}
              onClick={() => onSelect(option)}
            >
              <Image
                loading="eager"
                priority={true}
                src={option.image}
                alt={option.title}
                width={0}
                height={0}
                style={{ width: 'auto', height: '80px' }}
              />
            </div>
            {selected === option.id && (
              <div
                id="info-overview"
                onMouseLeave={() => onSelect(false)}
                className="absolute border-2 border-slate-200 w-full p-2 shadow-2xl z-20 bottom-16 left-[4rem] bg-white min-w-[25rem]"
              >
                <div className="flex justify-end w-full">
                  <BaseIcon
                    icon="close"
                    size="md"
                    onClick={() => onSelect(false)}
                    additionalClasses="cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <Typography additionalClasses="text-md font-bold">{option.title}</Typography>
                  <Typography additionalClasses="text-sm">{option.description}</Typography>
                  <div className="w-full flex my-2 justify-end">
                    <AddOption
                      title="Add to cart"
                      option={option}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OptionsList
