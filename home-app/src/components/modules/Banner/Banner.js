import Link from 'next/link'
import Image from 'next/image'

const Banner = ({ banner }) => {
  return (
    <section className="relative">
      <div className="w-full h-full">
        <Image image={banner.image} />
      </div>
      <div className="absolute z-10 top-1/4 left-[10%] bg-white shadow-lg p-16">
        <p className="font-bold text-lg mb-4">{banner.title}</p>
        <Link href={banner.slug}>
          <button className="p-3 font-black border-2 border-black hover:bg-black hover:text-white">
            {banner.cta_title}
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Banner
