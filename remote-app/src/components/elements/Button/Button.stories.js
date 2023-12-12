import React from 'react'

import Button from './Button'

export default {
  title: 'Elements/Button',
  component: Button,
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})

Default.args = {
  children: 'Button',
  additionalClasses: 'bg-slate-900 hover:bg-slate-800 text-white',
  onClick: () => console.log('Button clicked'),
}

export const Primary = Template.bind({})

Primary.args = {
  children: 'Button',
  variant: 'primary',
  onClick: () => console.log('Button clicked'),
}

export const Disabled = Template.bind({})

Disabled.args = {
  children: 'Button',
  disabled: true,
  onClick: () => console.log('Button clicked'),
}

export const Link = Template.bind({})

Link.args = {
  children: 'Button',
  href: 'https://google.com',
  onClick: () => console.log('Button clicked'),
}

export const FullWidth = Template.bind({})

FullWidth.args = {
  children: 'Button',
  fullWidth: true,
  onClick: () => console.log('Button clicked'),
}
