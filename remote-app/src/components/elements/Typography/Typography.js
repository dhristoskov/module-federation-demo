import 'tailwindcss/tailwind.css'

const Typography = ({ tag = 'p', children, spacingTop, spacingBottom, casting, additionalClasses }) => {
  const Tag = tag
  const lettersCase = casting === 'uppercase' ? 'uppercase' : casting === 'lowercase' ? 'lowercase' : 'normal-case'

  return <Tag className={`${lettersCase} ${spacingTop} ${spacingBottom} ${additionalClasses}`}>{children}</Tag>
}

export default Typography
