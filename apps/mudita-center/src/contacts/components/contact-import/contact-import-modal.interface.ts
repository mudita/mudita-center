/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalType } from "App/contacts/components/contact-import/contact-import-modal.enum"
import { NewContact } from "App/contacts/reducers/contacts.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ComponentProps } from "react"

export interface ContactImportModalProps
  extends Omit<ComponentProps<typeof ModalDialog>, "onActionButtonClick"> {
  onActionButtonClick: (contacts: NewContact[]) => void
  contacts: NewContact[]
  modalType: ModalType
  successfulItemsCount?: number
}
