import React, { useState } from 'react'

import Modal from '@/components/elements/Modal/Modal'
import AccountView from '../AccountView/AccountView'
import AccountSettings from '../AccountView/AccountSettings'

const AccountModal = ({ onClick, isOpen }) => {
  const [selected, setSelected] = useState(null)
  return (
    <Modal
      account={true}
      isOpen={isOpen}
      onClose={onClick}
    >
      <div className="py-8 px-5 min-h-[32rem] flex flex-col justify-center">
        {!selected && <AccountView setSelected={setSelected} />}
        {!!selected && (
          <AccountSettings
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
    </Modal>
  )
}

export default AccountModal
