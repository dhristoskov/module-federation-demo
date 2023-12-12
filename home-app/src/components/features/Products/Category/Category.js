import React from 'react'

import CategoryGrid from '@/components/modules/CategoryGrid/CategoryGrid'
import Typography from '@/components/elements/Typography/Typography'

const categorie = [
  {
    id: 1,
    title: 'Bunny',
    image: 'https://dearbear.eu/wp-content/uploads/2019/08/7893-324x324.jpg',
    link: '/products/bunny',
  },
  {
    id: 2,
    title: 'Dino',
    image: 'https://dearbear.eu/wp-content/uploads/2021/07/dino-zblizenie-324x324.jpg',
    link: '/products/dino',
  },
  {
    id: 3,
    title: 'Dog and cats',
    image:
      'https://dearbear.eu/wp-content/uploads/2023/08/livlig-pluszak-pies-siberian-husky__0396078_pe562358_s5-768x768.jpg',
    link: '/products/dog-and-cats',
  },
  {
    id: 4,
    title: 'Elephant',
    image: 'https://dearbear.eu/wp-content/uploads/2018/11/8999-324x324.jpg',
    link: '/products/elephant',
  },
  {
    id: 5,
    title: 'Giraffe',
    image: 'https://dearbear.eu/wp-content/uploads/2021/07/9723-324x324.jpg',
    link: '/products/giraffe',
  },
  {
    id: 6,
    title: 'Koala',
    image: 'https://dearbear.eu/wp-content/uploads/2019/10/Koala-160-324x324.jpg',
    link: '/products/koala',
  },
  {
    id: 7,
    title: 'Monkey',
    image: 'https://dearbear.eu/wp-content/uploads/2023/04/7-324x324.jpg',
    link: '/products/monkey',
  },
  {
    id: 8,
    title: 'Panda',
    image: 'https://dearbear.eu/wp-content/uploads/2018/11/8862-324x324.jpg',
    link: '/products/panda',
  },
]

const Category = () => {
  return (
    <div className="my-16 flex flex-col gap-8">
      <Typography
        variant="h4"
        additionalClasses="text-2xl font-bold"
      >
        Our product categories
      </Typography>
      <CategoryGrid categories={categorie} />
    </div>
  )
}

export default Category
