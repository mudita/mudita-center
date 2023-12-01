/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import { ContactImportModal } from "App/contacts/components/contact-import/contact-import-modal.component"
import { ModalType } from "App/contacts/components/contact-import/contact-import-modal.enum"
import { ModalWrapper } from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { contactsSeedInput } from "App/__deprecated__/seeds/contacts"
import React from "react"

storiesOf("Views|Contacts/Modals", module)
  .add("Select contacts to save", () => {
    return (
      <ModalWrapper>
        <ContactImportModal
          contacts={contactsSeedInput}
          onActionButtonClick={noop}
          modalType={ModalType.Select}
          open
        />
      </ModalWrapper>
    )
  })
  .add("Contacts saved successfully", () => {
    return (
      <ModalWrapper>
        <ContactImportModal
          contacts={contactsSeedInput}
          onActionButtonClick={noop}
          modalType={ModalType.Success}
          open
        />
      </ModalWrapper>
    )
  })
  .add("Contacts save failed", () => {
    return (
      <ModalWrapper>
        <ContactImportModal
          contacts={contactsSeedInput}
          onActionButtonClick={noop}
          modalType={ModalType.Fail}
          successfulItemsCount={3}
          open
        />
      </ModalWrapper>
    )
  })
