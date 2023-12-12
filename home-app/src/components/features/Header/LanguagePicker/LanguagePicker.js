import React, { useState } from 'react'

import BaseIcon from '@/components/elements/BaseIcon/BaseIcon'

const languages = [
  { code: 'en', name: 'English', icon: 'flag-gb' },
  { code: 'de', name: 'Deutsch', icon: 'flag-de' },
]

const LanguagePicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  const switchLanguage = () => {
    setSelectedLanguage(languages.find((language) => language.code !== selectedLanguage.code))
  }

  return (
    <div
      onClick={() => switchLanguage()}
      className="cursor-pointer min-w-[1.6rem]"
    >
      <BaseIcon
        icon={selectedLanguage.icon}
        size="md"
      />
    </div>
  )
}

export default LanguagePicker
