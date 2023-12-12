import Image from 'next/image'

import icons from './icons'

import 'tailwindcss/tailwind.css'

const ICON_SIZE = {
  xs: 14,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 56,
}

const BaseIcon = ({ icon, size = 'md', additionalClasses, onClick }) => {
  return (
    <Image
      src={icons[icon]}
      alt={icon}
      width={ICON_SIZE[size]}
      height={ICON_SIZE[size]}
      className={additionalClasses}
      onClick={onClick}
    />
  )
}

export default BaseIcon
