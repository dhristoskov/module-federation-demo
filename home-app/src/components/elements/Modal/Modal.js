import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import Overlay from '../Overlay/Overlay'
import BaseIconButton from '../BaseIconButton/BaseIconButton'

const Modal = ({ children, onClose }) => {
  const [mounted, setMounted] = React.useState(false)
  const modalStyles = `xs:w-[95%] sm:w-[27.5rem] absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-neutral-200 shadow-md bg-white rounded-xl`

  useEffect(() => setMounted(true), [])

  const ModalComponent = () => {
    return (
      <>
        <Overlay onClose={onClose} />
        <div className={modalStyles}>
          <div className="absolute -top-7 -right-2">
            <BaseIconButton
              icon="close"
              size="lg"
              onClick={onClose}
            />
          </div>
          {children}
        </div>
      </>
    )
  }

  return mounted ? createPortal(ModalComponent(), document.body) : null
}

export default Modal
