import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import Overlay from '../Overlay/Overlay'
import BaseIconButton from '../BaseIconButton/BaseIconButton'

const Modal = ({ children, onClose, isOpen, account = false, required = false }) => {
  const [mounted, setMounted] = React.useState(false)
  const modalStyles = `xs:w-[95%] sm:w-[27.5rem] absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-neutral-200 shadow-2xl bg-white rounded-xl`
  const accountModalStyles = `xs:w-[90%] lg:w-[80%] fixed z-20 bottom-0 inset-x-0 mx-auto border-2 border-neutral-200 shadow-2xl bg-white max-h-[85%] overflow-y-scroll`
  const closeIconStyles = `absolute -top-7 -right-2`
  const closeIconAccountStyles = `absolute top-2 right-2`
  const modalClasses = account ? accountModalStyles : modalStyles
  const closeIconClasses = account ? closeIconAccountStyles : closeIconStyles

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const ModalComponent = () => {
    return (
      isOpen && (
        <>
          <Overlay
            account={account}
            required={required}
            onClose={onClose}
          />
          <div className={modalClasses}>
            {!required && (
              <div className={closeIconClasses}>
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
    )
  }

  return mounted ? createPortal(ModalComponent(), document.body) : null
}

export default Modal
