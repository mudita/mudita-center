import { storiesOf } from "@storybook/react"
import React from "react"
import ContactImportModal, {
  ModalType,
} from "App/contacts/components/contact-import/contact-import-modal.component"
import { ModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"
import { contactsSeedInput } from "App/seeds/contacts"
import { noop } from "Renderer/utils/noop"

storiesOf("Views|Contacts/Modals", module)
  .add("Select contacts to save", () => {
    return (
      <ModalWrapper>
        <ContactImportModal
          contacts={contactsSeedInput}
          onActionButtonClick={noop}
          modalType={ModalType.Select}
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
        />
      </ModalWrapper>
    )
  })
