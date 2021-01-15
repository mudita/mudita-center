import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import { Contact, ContactID } from "App/contacts/store/contacts.type"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/store/contacts.helpers"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { defineMessages } from "react-intl"
import { noop } from "Renderer/utils/noop"
import {
  Buttons,
  ContactSelectionManager,
  Panel,
} from "App/contacts/components/contact-panel/contact-panel.styled"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import {
  ErrorDataModal,
  LoadingStateDataModal,
} from "Renderer/components/rest/data-modal/data.modals"
import delayResponse from "@appnroll/delay-response"
import ContactInputSearch from "App/contacts/components/contact-input-search/contact-input-search.component"

const deleteModalMessages = defineMessages({
  title: { id: "view.name.phone.contacts.modal.delete.title" },
  export: { id: "view.name.phone.contacts.selectionExport" },
  body: { id: "view.name.phone.contacts.modal.deleteMultipleContacts" },
  deletingText: { id: "view.name.phone.contacts.modal.deleting.text" },
})

export interface ContactPanelProps {
  onContactSelect: (contact: Contact) => void
  onManageButtonClick: () => void
  onNewButtonClick: () => void
  selectedContacts: Contact[]
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Contact>["toggleAll"]
  deleteContacts: (ids: ContactID[]) => Promise<string | void>
  resetRows: UseTableSelect<Contact>["resetRows"]
  contacts: Contact[]
}

const ContactPanel: FunctionComponent<ContactPanelProps> = ({
  onContactSelect,
  onManageButtonClick,
  onNewButtonClick,
  selectedContacts,
  allItemsSelected,
  toggleAll = noop,
  deleteContacts,
  resetRows,
  contacts,
}) => {
  const selectedItemsCount = selectedContacts.length
  const selectionMode = selectedItemsCount > 0
  const openModal = () => {
    const selectedContactsIds = selectedContacts.map(({ id }) => id)
    const nameAvailable =
      selectedContacts.length === 1 && isNameAvailable(selectedContacts[0])
    const onDelete = async () => {
      modalService.openModal(
        <LoadingStateDataModal
          textMessage={deleteModalMessages.deletingText}
        />,
        true
      )
      const error = await delayResponse(deleteContacts(selectedContactsIds))
      if (error) {
        modalService.openModal(<ErrorDataModal />, true)
      } else {
        modalService.closeModal()
      }
      resetRows()
    }
    const modalConfig = {
      title: intl.formatMessage(deleteModalMessages.title),
      message: {
        ...deleteModalMessages.body,
        values: {
          num: allItemsSelected ? -1 : selectedContactsIds.length,
          name: nameAvailable && createFullName(selectedContacts[0]),
          ...textFormatters,
        },
      },
      onDelete,
      onClose: resetRows,
    }
    modalService.openModal(<DeleteModal {...modalConfig} />)
  }
  return (
    <Panel selectionMode={selectionMode}>
      {selectionMode ? (
        <ContactSelectionManager
          selectedItemsNumber={selectedItemsCount}
          allItemsSelected={Boolean(allItemsSelected)}
          message={{ id: "view.name.phone.contacts.selectionsNumber" }}
          checkboxSize={Size.Large}
          onToggle={toggleAll}
          buttons={[
            <ButtonComponent
              key="export"
              label={intl.formatMessage(deleteModalMessages.export)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.Upload}
              onClick={noop}
            />,
            <ButtonComponent
              key="delete"
              label={intl.formatMessage(messages.deleteButton)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.Delete}
              onClick={openModal}
            />,
          ]}
          data-testid={ContactPanelTestIdsEnum.SelectionManager}
        />
      ) : (
        <ContactInputSearch
          contacts={contacts}
          onContactSelect={onContactSelect}
        />
      )}
      <Buttons>
        <ButtonComponent
          displayStyle={DisplayStyle.Secondary}
          labelMessage={{ id: "view.name.phone.contacts.panel.manageButton" }}
          onClick={onManageButtonClick}
          data-testid={ContactPanelTestIdsEnum.ManageButton}
        />
        <ButtonComponent
          labelMessage={{
            id: "view.name.phone.contacts.panel.newContactButton",
          }}
          onClick={onNewButtonClick}
        />
      </Buttons>
    </Panel>
  )
}

export default ContactPanel
