import React, { useState } from "react"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"

import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import MessagesList, {
  ActiveRow,
} from "Renderer/components/rest/messages/messages-list.component"
import {
  FiltersWrapper,
  UnreadFilters,
} from "Renderer/components/rest/messages/topics-table.component"
import {
  ComponentProps as MessagesProps,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import styled from "styled-components"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"

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

const toggleState = [
  intl.formatMessage({
    id: "view.name.messages.allMessages",
  }),
  intl.formatMessage({
    id: "view.name.messages.unreadOnly",
  }),
] as const

const Messages: FunctionComponent<MessagesProps> = ({
  searchValue,
  changeSearchValue = noop,
  changeVisibilityFilter = noop,
  list,
}) => {
  const [activeLabel, setActiveLabel] = useState(toggleState[0])
  const [messagesList, setMessagesList] = useState(list)
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<ActiveRow>()

  const showAllMessages = () => {
    changeVisibilityFilter(VisibilityFilter.All)
  }

  const hideReadMessages = () => {
    changeVisibilityFilter(VisibilityFilter.Unread)
  }

  const _devClearMessages = () => setMessagesList([])
  const _devLoadDefaultMessages = () => setMessagesList(list)

  return (
    <>
      <DevModeWrapper>
        <p>Messages on list: {messagesList.length}</p>
        <Button onClick={_devClearMessages} label="Remove all messages" />
        <br />
        <Button
          onClick={_devLoadDefaultMessages}
          label="Load default messages"
        />
      </DevModeWrapper>
      <FiltersWrapper checkMode>
        <UnreadFilters>
          <ButtonToggler>
            {toggleState.map((label, i) => {
              const onClick = () => {
                i === 0 ? showAllMessages() : hideReadMessages()
                setActiveLabel(label)
              }
              return (
                <MessagesButtonTogglerItem
                  key={i}
                  label={label}
                  onClick={onClick}
                  active={activeLabel === label}
                />
              )
            })}
          </ButtonToggler>
        </UnreadFilters>
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
        <ButtonWrapper>
          <Button
            displayStyle={DisplayStyle.Primary}
            size={Size.FixedBig}
            label={intl.formatMessage({
              id: "view.name.messages.newMessage",
            })}
            onClick={noop}
            Icon={Type.PlusSign}
          />
        </ButtonWrapper>
      </FiltersWrapper>
      <TableWithSidebarWrapper>
        <MessagesList
          list={messagesList}
          openSidebar={openSidebar}
          activeRow={activeRow}
        />
        {activeRow && (
          <MessageDetails details={activeRow} onClose={closeSidebar} />
        )}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
