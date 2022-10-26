/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/dto"
import { ContactAttachmentPresenter } from "App/contacts/presenters"
import { useState } from "react"

interface Props {
  setContent: (content: string) => void
}

interface UseAttachContactsHook {
  isModalOpened: boolean
  openAttachContactModal: () => void
  closeAttachContactModal: () => void
  attachContact: (contact: Contact) => void
}

export const useAttachContacts = ({
  setContent,
}: Props): UseAttachContactsHook => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const openAttachContactModal = () => {
    setIsModalOpened(true)
  }

  const closeAttachContactModal = () => {
    setIsModalOpened(false)
  }

  const attachContact = (contact: Contact): void => {
    if (!contact) {
      return
    }

    setIsModalOpened(false)
    setContent(ContactAttachmentPresenter.toAttachment(contact))
  }

  return {
    isModalOpened,
    openAttachContactModal,
    closeAttachContactModal,
    attachContact,
  }
}
