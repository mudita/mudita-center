import React, { ChangeEvent } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { Contact, ContactID } from "Renderer/models/phone/phone.typings"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { defineMessages } from "react-intl"
import { noop } from "Renderer/utils/noop"
import {
  Buttons,
  ContactSelectionManager,
  Panel,
  SearchInput,
} from "Renderer/components/rest/phone/contact-panel.styled"
import { ContactPanelTestIdsEnum } from "Renderer/components/rest/phone/contact-panel-test-ids.enum"

const deleteModalMessages = defineMessages({
  title: { id: "view.name.phone.contacts.modal.delete.title" },
  export: { id: "view.name.phone.contacts.selectionExport" },
  body: { id: "view.name.phone.contacts.modal.deleteMultipleContacts" },
})

export interface ContactPanelProps {
  onSearchTermChange: (value: string) => void
  onManageButtonClick: () => void
  onNewButtonClick: () => void
  selectedContacts: Contact[]
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Contact>["toggleAll"]
  deleteContact?: (id: ContactID) => void
  resetRows: UseTableSelect<Contact>["resetRows"]
  manageButtonDisabled?: boolean
}

const ContactPanel: FunctionComponent<ContactPanelProps> = ({
  onSearchTermChange,
  onManageButtonClick,
  onNewButtonClick,
  selectedContacts,
  allItemsSelected,
  toggleAll = noop,
  deleteContact = noop,
  resetRows,
  manageButtonDisabled = false,
}) => {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(target.value)
  }
  const selectedItemsCount = selectedContacts.length
  const selectionMode = selectedItemsCount > 0
  const openModal = () => {
    const selectedContactsIds = selectedContacts.map(({ id }) => id)
    const nameAvailable =
      selectedContacts.length === 1 && isNameAvailable(selectedContacts[0])
    const onDelete = () => {
      selectedContactsIds.forEach((id) => deleteContact(id))
      resetRows()
      modalService.closeModal()
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
        <SearchInput
          leadingIcons={[searchIcon]}
          label={intl.formatMessage({
            id: "view.name.phone.contacts.panel.searchPlaceholder",
          })}
          onChange={onChange}
          type="search"
          outlined
        />
      )}
      <Buttons>
        <ButtonComponent
          displayStyle={DisplayStyle.Secondary}
          labelMessage={{ id: "view.name.phone.contacts.panel.manageButton" }}
          onClick={onManageButtonClick}
          data-testid={ContactPanelTestIdsEnum.ManageButton}
          disabled={manageButtonDisabled}
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
