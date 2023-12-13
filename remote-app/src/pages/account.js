import dynamic from 'next/dynamic'

const AccountPage = dynamic(() => import('home/Account'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const Account = AccountPage
Account.getInitialProps = AccountPage.getInitialProps
export default Account
