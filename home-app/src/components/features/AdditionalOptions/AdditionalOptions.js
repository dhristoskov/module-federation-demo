import React, { useState } from 'react'

import OptionsList from './components/OptionsList'
import Typography from '@/components/elements/Typography/Typography'

const AdditionalOptions = ({ options, selectedOptions }) => {
  const [selected, setSelected] = useState(null)

  const handleSelect = (item) => {
    setSelected(item.id)
  }

  const sacks = options?.length > 0 && options?.filter((option) => option?.attributes?.category === 'sacks')
  const boxes = options?.length > 0 && options?.filter((option) => option?.attributes?.category === 'boxes')
  const cards = options?.length > 0 && options?.filter((option) => option?.attributes?.category === 'cards')
  const balloons = options?.length > 0 && options?.filter((option) => option?.attributes?.category === 'baloons')

  return (
    <section className="mt-10">
      <Typography additionalClasses="text-xl font-bold text-slate-900 mb-6">Choose additional services:</Typography>
      <div className="flex flex-col gap-3">
        <OptionsList
          options={sacks}
          sectionTitle="Sacks"
          selected={selected}
          onSelect={handleSelect}
          selectedOptions={selectedOptions}
        />
        <OptionsList
          options={boxes}
          sectionTitle="Boxes"
          selected={selected}
          onSelect={handleSelect}
          selectedOptions={selectedOptions}
        />
        <OptionsList
          options={cards}
          sectionTitle="Cards"
          selected={selected}
          onSelect={handleSelect}
          selectedOptions={selectedOptions}
        />
        <OptionsList
          options={balloons}
          sectionTitle="Balloons"
          selected={selected}
          onSelect={handleSelect}
          selectedOptions={selectedOptions}
        />
      </div>
    </section>
  )
}

export default AdditionalOptions
