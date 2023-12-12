const Notification = ({ activeNotification }) => {
  const { message, type } = activeNotification
  const notificationClass = type === 'success' ? 'bg-green-400' : 'bg-red-400 text-white'

  return (
    message !== '' && (
      <div className="fixed bottom-16 right-14 z-20 w-full flex justify-end">
        <p className={`${notificationClass} max-w-[36rem] min-w-[28rem] py-4 px-5 shadow-xl text-sm rounded-xl`}>
          {message}
        </p>
      </div>
    )
  )
}

export default Notification
