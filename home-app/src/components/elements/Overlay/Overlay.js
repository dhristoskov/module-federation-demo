import React from 'react'

const Overlay = ({ account, onClose, required }) => {
  const overlayStyles = `fixed z-10 inset-0 bg-gray-300 bg-opacity-60 transition-opacity`
  const accountOverlayStyles = `fixed z-10 inset-0 bg-slate-100 bg-opacity-40 transition-opacity`
  const overlayClasses = account ? accountOverlayStyles : overlayStyles

  return (
    <div
      onClick={!required ? onClose : null}
      className={overlayClasses}
    />
  )
}

export default Overlay
