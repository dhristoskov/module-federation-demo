import Breakpoints from '@/components/foundations/Breakpoints/Breakpoints'

const Footer = () => {
  return (
    <footer className="h-14 shadow-md shadow-slate-300 bg-slate-900">
      <Breakpoints tag="div">
        <div className="col-span-full col-start-1 flex h-full items-center justify-center text-white">
          <p>© 2023 Home App Footer</p>
        </div>
      </Breakpoints>
    </footer>
  )
}

export default Footer
