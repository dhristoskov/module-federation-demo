const logout = () => {
  localStorage.removeItem('userData')
  const event = new Event('logout')
  window.dispatchEvent(event)
}

export default logout
