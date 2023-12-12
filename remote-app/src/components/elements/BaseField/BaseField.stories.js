// create a story for the BaseField component

import React from 'react'

import BaseField from './BaseField'

export default {
  title: 'Elements/BaseField',
  component: BaseField,
}

const Template = (args) => <BaseField {...args} />

export const Default = Template.bind({})

Default.args = {
  label: 'Label',
  helpMessage: 'Help message',
  errorMessage: 'Error message',
  openMessage: true,
  children: (
    <input
      type="text"
      className="border border-slate-500 w-full h-10 px-3"
    />
  ),
}
