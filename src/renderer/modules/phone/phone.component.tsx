import React, { useEffect, useState } from "react"
import ContactList from "Renderer/modules/phone/components/contact-list.component"
import ContactPanel, {
  ContactPanelProps,
} from "Renderer/modules/phone/components/contact-panel.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import ContactDetails, {
  ContactActions,
  ContactDetailsActions,
} from "Renderer/modules/phone/components/contact-details.component"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import { Contact, Contacts } from "Renderer/models/phone/phone.interface"
import ContactEdit from "Renderer/modules/phone/components/contact-edit.component"
import { noop } from "Renderer/utils/noop"

const ContactSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("primaryDark")};
`

type PhoneProps = Contacts &
  ContactActions &
  ContactPanelProps &
  ContactDetailsActions

const Phone: FunctionComponent<PhoneProps> = ({
  onSearchTermChange,
  onManageButtonClick,
  contactList,
  onExport,
  onForward,
  onBlock,
  onDelete,
  onEdit,
  onCall,
  onMessage,
}) => {
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Contact>()
  const [adding, setAddingState] = useState(false)
  const [editing, setEditingState] = useState(false)

  useEffect(() => {
    if (adding) {
      closeSidebar()
    }
  }, [adding])

  const handleEditCancel = () => {
    closeSidebar()
    setAddingState(false)
  }

  const handleAddingContact = () => {
    setAddingState(true)
  }

  return (
    <ContactSection>
      <ContactPanel
        onSearchTermChange={onSearchTermChange}
        onManageButtonClick={onManageButtonClick}
        onNewButtonClick={handleAddingContact}
      />
      <TableWithSidebarWrapper>
        <ContactList
          activeRow={activeRow}
          contactList={contactList}
          onSelect={openSidebar}
          onExport={onExport}
          onForward={onForward}
          onBlock={onBlock}
          onDelete={onDelete}
          onCheck={noop}
          adding={adding}
        />
        {adding && (
          <ContactEdit
            onCancel={handleEditCancel}
            onSpeedDialSettingsOpen={noop}
            onSave={noop}
          />
        )}
        {activeRow && !adding && (
          <ContactDetails
            contact={activeRow}
            onClose={closeSidebar}
            onExport={onExport}
            onForward={onForward}
            onBlock={onBlock}
            onDelete={onDelete}
            onEdit={onEdit}
            onCall={onCall}
            onMessage={onMessage}
          />
        )}
      </TableWithSidebarWrapper>
    </ContactSection>
  )
}

export default Phone
