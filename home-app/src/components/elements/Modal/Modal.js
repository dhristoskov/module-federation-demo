import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import Overlay from '../Overlay/Overlay'
import BaseIconButton from '../BaseIconButton/BaseIconButton'

const Modal = ({ children, onClose, account = false }) => {
  const [mounted, setMounted] = React.useState(false)
  const modalStyles = `xs:w-[95%] sm:w-[27.5rem] absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-neutral-200 shadow-md bg-white rounded-xl`
  const accountModalStyles = `w-[85%] fixed z-20 bottom-0 inset-x-0 mx-auto border-2 border-neutral-200 shadow-md bg-white max-h-[85%] overflow-y-scroll`
  const modalClasses = account ? accountModalStyles : modalStyles

  useEffect(() => setMounted(true), [])

  const ModalComponent = () => {
    return (
      <>
        <Overlay
          account={account}
          onClose={onClose}
        />
        <div className={modalClasses}>
          {!account && (
            <div className="absolute -top-7 -right-2">
              <BaseIconButton
                icon="close"
                size="lg"
                onClick={onClose}
              />
            </div>
          )}
          {children}
        </div>
      </>
    )
  }

  return mounted ? createPortal(ModalComponent(), document.body) : null
}

export default Modal
