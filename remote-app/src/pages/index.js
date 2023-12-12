import Auth from '@/components/features/Auth/Auth'

const Home = ({}) => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      Remote app
      <div className="w-[27.5rem] border-2 border-neutral-200 shadow-md bg-white">
        <Auth />
      </div>
    </main>
  )
}

export default Home
