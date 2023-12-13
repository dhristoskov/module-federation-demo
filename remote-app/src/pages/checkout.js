import dynamic from 'next/dynamic'

const CheckoutPage = dynamic(() => import('home/Checkout'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const Checkout = CheckoutPage
Checkout.getInitialProps = CheckoutPage.getInitialProps
export default Checkout
