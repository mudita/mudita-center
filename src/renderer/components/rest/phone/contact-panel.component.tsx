import React, { ChangeEvent } from "react"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl } from "Renderer/utils/intl"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { Contact } from "Renderer/models/phone/phone.typings"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { MessagePanelTestIds } from "Renderer/modules/messages/messages-panel-test-ids.enum"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import SelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"

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

export interface ContactPanelProps {
  onSearchTermChange: (value: string) => void
  onManageButtonClick: () => void
  onNewButtonClick: () => void
  selectedContacts: Contact[]
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Contact>["toggleAll"]
}

const ContactPanel: FunctionComponent<ContactPanelProps> = ({
  onSearchTermChange,
  onManageButtonClick,
  onNewButtonClick,
  selectedContacts,
  allItemsSelected,
  toggleAll,
}) => {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(target.value)
  }
  const selectedItemsCount = selectedContacts.length
  const selectionMode = selectedItemsCount > 0
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
