import dynamic from 'next/dynamic'

const AccountSettings = dynamic(() => import('home/AccountSettings'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const Settings = AccountSettings
Settings.getInitialProps = AccountSettings.getInitialProps
export default Settings