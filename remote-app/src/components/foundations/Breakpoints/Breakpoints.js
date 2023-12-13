const Breakpoints = ({ tag = 'section', children }) => {
  const Tag = tag

  return (
    <Tag className="grid grid-cols-4 gap-6 sm:grid-cols-8 md:grid-cols-12 px-10 xl:px-0 mx-auto max-w-[82.5rem] h-full">
      {children}
    </Tag>
  )
}

export default Breakpoints
