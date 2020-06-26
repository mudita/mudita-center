import React, { ChangeEvent, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  FiltersWrapper,
  UnreadFilters,
} from "Renderer/components/rest/messages/topics-table.component"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { intl } from "Renderer/utils/intl"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import styled, { css } from "styled-components"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { Topic } from "Renderer/models/messages/messages.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import SelectionManager from "App/renderer/components/core/selection-manager/selection-manager.component"

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const MessagesButtonTogglerItem = styled(ButtonTogglerItem)`
  width: 13.8rem;
`

const SearchInput = styled(InputText)`
  width: 38rem;
`

const MessageSelectionManager = styled(SelectionManager)`
  grid-template-columns: 3.2rem 1fr auto;

  button {
    padding: 0.5rem 0.8rem;
  }
`

const MessageFiltersWrapper = styled(FiltersWrapper)<{
  selectionMode: boolean
}>`
  ${({ selectionMode }) =>
    selectionMode &&
    css`
      grid-template-areas: "Search New";
      grid-template-columns: 1fr auto;
    `}
`

const toggleState = [
  intl.formatMessage({
    id: "view.name.messages.allMessages",
  }),
  intl.formatMessage({
    id: "view.name.messages.unreadOnly",
  }),
] as const

interface Props {
  showAllMessages?: () => void
  hideReadMessages?: () => void
  searchValue: string
  changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
  selectedItemsCount: number
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Topic>["toggleAll"]
}

const MessagesPanel: FunctionComponent<Props> = ({
  showAllMessages = noop,
  hideReadMessages = noop,
  searchValue,
  changeSearchValue,
  selectedItemsCount,
  allItemsSelected,
  toggleAll = noop,
}) => {
  const [activeLabel, setActiveLabel] = useState(toggleState[0])
  const selectionMode = selectedItemsCount > 0
  return (
    <MessageFiltersWrapper checkMode selectionMode={selectionMode}>
      {!selectionMode && (
        <UnreadFilters data-testid="filter-buttons">
          <ButtonToggler>
            {toggleState.map((label, i) => {
              const toggle = () => {
                i === 0 ? showAllMessages() : hideReadMessages()
                setActiveLabel(label)
              }
              return (
                <MessagesButtonTogglerItem
                  key={i}
                  label={label}
                  onClick={toggle}
                  active={activeLabel === label}
                />
              )
            })}
          </ButtonToggler>
        </UnreadFilters>
      )}
      {selectionMode ? (
        <MessageSelectionManager
          selectedItemsNumber={selectedItemsCount}
          allItemsSelected={Boolean(allItemsSelected)}
          message={messages.selectionsNumber}
          checkboxSize={Size.Large}
          onToggle={toggleAll}
          buttons={[
            <ButtonComponent
              key="delete"
              label={intl.formatMessage(messages.deleteButton)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.Delete}
              onClick={noop}
            />,
          ]}
        />
      ) : (
        <SearchInput
          type={"search"}
          label={intl.formatMessage({
            id: "view.name.messages.search",
          })}
          outlined
          defaultValue={searchValue}
          onChange={changeSearchValue}
          leadingIcons={[searchIcon]}
        />
      )}
      <ButtonWrapper>
        <Button
          displayStyle={DisplayStyle.Primary}
          size={ButtonSize.FixedBig}
          label={intl.formatMessage({
            id: "view.name.messages.newMessage",
          })}
          onClick={noop}
          Icon={Type.PlusSign}
        />
      </ButtonWrapper>
    </MessageFiltersWrapper>
  )
}

export default MessagesPanel
