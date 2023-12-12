import React, { useState } from 'react'

import OptionsList from './components/OptionsList'
import Typography from '@/components/elements/Typography/Typography'

const SACKS = [
  {
    id: 11,
    price: 5.99,
    title: 'Sack Satin',
    description: 'Sack which is made of satin Sack is available in red and gold colours',
    image: 'https://dearbear.eu/wp-content/uploads/2019/10/Sack-Satin-Main-small.jpg',
  },
  {
    id: 12,
    price: 5.99,
    title: 'Sack with stars small',
    description: 'The sack is made of 100% cotton Sack is available in red and beige colours.',
    image: 'https://dearbear.eu/wp-content/uploads/2019/10/worki2-small.jpg',
  },
  {
    id: 13,
    price: 7.99,
    title: 'Sack with bear print',
    description: 'The sack is made of 100% cotton The sack is available in beige colour with bear print.',
    image: 'https://dearbear.eu/wp-content/uploads/2019/10/worki-small.jpg',
  },
]

const BOXES = [
  {
    id: 14,
    price: 8.99,
    title: 'White gift box',
    description: 'Gift box is available in colours: white, red or blue.',
    image: 'https://dearbear.eu/wp-content/uploads/2019/10/Box-White-1-small.jpg',
  },
  {
    id: 15,
    price: 5.99,
    title: 'Box into box',
    description: 'We put one box into another',
    image: 'https://dearbear.eu/wp-content/uploads/2019/10/Karton-W-Karton-small.jpg',
  },
]

const CARDS = [
  {
    id: 16,
    price: 1.99,
    title: 'Note card',
    description: 'Enter the content of the note, or give the name of the recipient - we will make it up for you...',
    image: 'https://dearbear.eu/wp-content/uploads/2019/10/koperty-6-scaled-small.jpg',
  },
  {
    id: 17,
    price: 3.99,
    title: 'Premium letter',
    description: 'Enter the content of the note, or give the name of the recipient - we will make it up for you...',
    image: 'https://dearbear.eu/wp-content/uploads/2023/09/koperty-7-scaled-1-280x280.jpg',
  },
]

const BALLOONS = [
  {
    id: 18,
    price: 9.99,
    title: 'Balloons Golden Heart',
    description:
      'Add heart-shaped balloons to your shipment! Make two balloons fly out of the recipients parcel, which will increase the joy and smile. The balloons are metallized and of course immediately filled with helium. They are in golden color and heart-shaped.',
    image: 'https://dearbear.eu/wp-content/uploads/2021/09/zlote-serca-280x280.jpg',
  },
  {
    id: 19,
    price: 9.99,
    title: 'Balloons Pink Hearts',
    description:
      'Add heart-shaped balloons to your shipment! Make two balloons fly out of the recipients parcel, which will increase the joy and smile. The balloons are metallized and of course immediately filled with helium. They are in pink color and heart-shaped.',
    image: 'https://dearbear.eu/wp-content/uploads/2021/09/roz-280x280.jpg',
  },
  {
    id: 20,
    price: 9.99,
    title: 'Balloons pink Stars',
    description:
      'Add star-shaped balloons to your shipment! Make two balloons fly out of the recipients parcel, which will increase the joy and smile. The balloons are metallized and of course immediately filled with helium. They are in pink color and star-shaped.',
    image: 'https://dearbear.eu/wp-content/uploads/2021/09/gwiazda-big-280x280.jpg',
  },
]

const AdditionalOptions = ({ selectedOptions }) => {
  const [selected, setSelected] = useState(null)

  const handleSelect = (item) => {
    setSelected(item.id)
  }

  return (
    <section className="mt-10">
      <Typography additionalClasses="text-xl font-bold text-slate-900 mb-6">Choose additional services:</Typography>
      <div className="flex flex-col gap-3">
        <OptionsList
          options={SACKS}
          sectionTitle="Sacks"
          selected={selected}
          onSelect={handleSelect}
        />
        <OptionsList
          options={BOXES}
          sectionTitle="Boxes"
          selected={selected}
          onSelect={handleSelect}
        />
        <OptionsList
          options={CARDS}
          sectionTitle="Cards"
          selected={selected}
          onSelect={handleSelect}
        />
        <OptionsList
          options={BALLOONS}
          sectionTitle="Balloons"
          selected={selected}
          onSelect={handleSelect}
        />
      </div>
    </section>
  )
}

export default AdditionalOptions
