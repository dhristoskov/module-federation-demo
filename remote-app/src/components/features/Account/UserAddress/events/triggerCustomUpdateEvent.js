const triggerCustomUpdateEvent = (event, data) => {
  const customEvent = new CustomEvent(event, { detail: data })
  window.dispatchEvent(customEvent)
}

export default triggerCustomUpdateEvent
