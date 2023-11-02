import { ContactImportModal } from "App/contacts/components/contact-import/contact-import-modal.component"
import { ModalType } from "App/contacts/components/contact-import/contact-import-modal.enum"
import { ModalWrapper } from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { contactsSeedInput } from "App/__deprecated__/seeds/contacts"
import React from "react"

export default {
  title: "Views|Contacts/Modals",
}

export const SelectContactsToSave = () => {
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
}

SelectContactsToSave.story = {
  name: "Select contacts to save",
}

export const ContactsSavedSuccessfully = () => {
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
}

ContactsSavedSuccessfully.story = {
  name: "Contacts saved successfully",
}

export const ContactsSaveFailed = () => {
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
}

ContactsSaveFailed.story = {
  name: "Contacts save failed",
}
