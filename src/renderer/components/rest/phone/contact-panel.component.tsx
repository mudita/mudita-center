import React, { ChangeEvent } from "react"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { Contact, ContactID } from "Renderer/models/phone/phone.typings"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { MessagePanelTestIds } from "Renderer/modules/messages/messages-panel-test-ids.enum"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import SelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { defineMessages } from "react-intl"
import { noop } from "Renderer/utils/noop"

const Panel = styled.div<{
  selectionMode: boolean
}>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 38rem 1fr;
  padding: 3.2rem 3rem 1rem 4rem;
  background-color: ${backgroundColor("main")};
  ${({ selectionMode }) =>
    selectionMode &&
    css`
      grid-template-columns: 62.4rem auto;
      padding-left: 0.6rem;
    `};
  label {
    width: auto;
  }
`

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(13rem, 1fr));
  grid-column-gap: 1.6rem;
  justify-self: end;

  button {
    width: auto;
  }
`

const deleteModalMessages = defineMessages({
  title: { id: "view.name.phone.contacts.modal.delete.title" },
  text: { id: "view.name.phone.contacts.modal.deleteMultipleContacts" },
})

export interface ContactPanelProps {
  onSearchTermChange: (value: string) => void
  onManageButtonClick: () => void
  onNewButtonClick: () => void
  selectedContacts: Contact[]
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Contact>["toggleAll"]
  removeContact?: (id: ContactID[]) => void
  resetRows: UseTableSelect<Contact>["resetRows"]
}

const ContactPanel: FunctionComponent<ContactPanelProps> = ({
  onSearchTermChange,
  onManageButtonClick,
  onNewButtonClick,
  selectedContacts,
  allItemsSelected,
  toggleAll = noop,
  removeContact = noop,
  resetRows,
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
    const textIntlValues = {
      num: allItemsSelected ? -1 : selectedContactsIds.length,
      ...textFormatters,
    }
    const onDelete = async () => {
      removeContact(selectedContactsIds)
      resetRows()
      await modalService.closeModal()
    }
    const modalConfig = {
      title: intl.formatMessage(deleteModalMessages.title),
      text: intl.formatMessage(deleteModalMessages.text, {
        ...textIntlValues,
        name: nameAvailable && createFullName(selectedContacts[0]),
      }),
      onDelete,
      onClose: resetRows,
    }
    modalService.openModal(<DeleteModal {...modalConfig} />)
  }
  return (
    <Panel selectionMode={selectionMode}>
      {selectionMode ? (
        <SelectionManager
          selectedItemsNumber={selectedItemsCount}
          allItemsSelected={Boolean(allItemsSelected)}
          message={{ id: "view.name.phone.contacts.selectionsNumber" }}
          checkboxSize={Size.Large}
          onToggle={toggleAll}
          buttons={[
            <ButtonComponent
              key="delete"
              label={intl.formatMessage(messages.deleteButton)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.Delete}
              onClick={openModal}
              data-testid={MessagePanelTestIds.SelectionManagerDeleteButton}
            />,
          ]}
          data-testid={MessagePanelTestIds.SelectionManager}
        />
      ) : (
        <InputComponent
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
