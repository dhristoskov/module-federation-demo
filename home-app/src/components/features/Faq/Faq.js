import React from 'react'

import Typography from '@/components/elements/Typography/Typography'
import Accordion from '@/components/modules/Accordion/Accordion'

const Faq = ({ faqs }) => {
  return (
    <div className="flex flex-col w-full items-center sm:p-12 xs:p-3 border-2 border-slate-600 gap-10 mb-10">
      <div className="w-full flex flex-col items-center gap-3">
        <Typography
          tag="h1"
          additionalClasses="text-3xl font-bold text-center"
        >
          Everything about our shop?
        </Typography>
        <Typography
          additionalClasses="text-lg underline text-center"
          casting="lowercase"
        >
          Explore the story behind our marketplace
        </Typography>
      </div>
      <Accordion
        list={faqs}
        type="chevron"
      />
      <div className="w-full flex flex-col items-center gap-3">
        <Typography additionalClasses="text-lg text-center">Have a question? Well, we’ve got some answers.</Typography>
        <div className="border-2 border-slate-600 p-2 rounded-3xl cursor-pointer">Go to Help Center</div>
      </div>
    </div>
  )
}

export default Faq
