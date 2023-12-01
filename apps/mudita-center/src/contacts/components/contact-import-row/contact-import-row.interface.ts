/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalType } from "App/contacts/components/contact-import/contact-import-modal.enum"
import { NewContact } from "App/contacts/reducers"
import { RowStatus } from "App/__deprecated__/renderer/utils/hooks/useTableSelect"

export interface ContactImportRowProperties {
  data: NewContact
  toggleRow: (data: NewContact) => void
  getRowStatus: (data: NewContact) => RowStatus
  modalType: ModalType
  testId?: string
}
