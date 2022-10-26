/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/dto"
import { useState } from "react"

interface Props {
  selectPhoneNumber: (phoneNumber: string) => void
}

interface UseBrowseContactsHook {
  isModalOpened: boolean
  openBrowseContactModal: () => void
  closeBrowseContactModal: () => void
  selectBrowsedPhoneNumber: (phoneNumber: string) => void
  selectBrowsedContact: (contact: Contact) => void
}

export const useBrowseContacts = ({
  selectPhoneNumber,
}: Props): UseBrowseContactsHook => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const openBrowseContactModal = () => {
    setIsModalOpened(true)
  }

  const closeBrowseContactModal = () => {
    setIsModalOpened(false)
  }

  const selectBrowsedContact = (contact: Contact | null): void => {
    if (!contact) {
      return
    }

    if (contact.primaryPhoneNumber) {
      selectPhoneNumber(contact.primaryPhoneNumber)
    } else if (contact.secondaryPhoneNumber) {
      selectPhoneNumber(contact.secondaryPhoneNumber)
    }

    setIsModalOpened(false)
  }

  const selectBrowsedPhoneNumber = (phoneNumber: string): void => {
    selectPhoneNumber(phoneNumber)
    setIsModalOpened(false)
  }

  return {
    isModalOpened,
    openBrowseContactModal,
    closeBrowseContactModal,
    selectBrowsedPhoneNumber,
    selectBrowsedContact,
  }
}
