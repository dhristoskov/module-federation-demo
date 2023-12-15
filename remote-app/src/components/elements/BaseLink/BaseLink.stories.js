import React from 'react'

import BaseLink from './BaseLink'

export default {
  title: 'Elements/BaseLink',
  component: BaseLink,
}

const Template = (args) => <BaseLink {...args} />

export const Default = Template.bind({})

Default.args = {
  children: 'BaseLink',
  link: 'https://google.com',
  target: true,
}

export const Primary = Template.bind({})
