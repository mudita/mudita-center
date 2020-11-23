import { storiesOf } from "@storybook/react"
import React from "react"
import ContactImportModal from "Renderer/components/rest/phone/contact-import-modal.component"
import { ModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import { phoneSeedInput } from "App/seeds/phone"
import { noop } from "Renderer/utils/noop"

storiesOf("Views|Contacts/Modals", module).add("Import contacts", () => {
  return (
    <ModalWrapper>
      <ContactImportModal
        onActionButtonClick={noop}
        contacts={phoneSeedInput}
      />
    </ModalWrapper>
  )
})
