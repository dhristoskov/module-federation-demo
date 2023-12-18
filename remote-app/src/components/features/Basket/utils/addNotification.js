// Context is not working very well with module federation, so I'm using localStorage to store the notification
const addNotification = (notification) => {
  const { message, type } = notification
  localStorage.setItem(
    'MFDnotification',
    JSON.stringify({ message, type, expiration: new Date(new Date().getTime() + 1000 * 30).toISOString() }),
  )

  const event = new CustomEvent('addNotification')
  window.dispatchEvent(event)
}

export default addNotification
