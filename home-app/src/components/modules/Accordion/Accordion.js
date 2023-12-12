import React from 'react'

import Collapse from '../Collapse/Collapse'

const Accordion = ({ list, type, tag }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-10 w-full my-5">
      {list.map((item) => {
        return (
          <Collapse
            key={item.id}
            type={type}
            tag={tag}
            title={item.attributes.question}
          >
            {item.attributes.answer}
          </Collapse>
        )
      })}
    </div>
  )
}

export default Accordion
