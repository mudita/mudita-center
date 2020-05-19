import React, { useState } from "react"
import InputText from "Renderer/components/core/input-text/input-text.component"
import {
  FiltersWrapper,
  TableWrapper,
  UnreadFilters,
} from "Renderer/components/rest/messages/topics-table.component"
import {
  ComponentProps as MessagesProps,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import Button from "Renderer/components/core/button/button.component"
import styled from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import Icon from "Renderer/components/core/icon/icon.component"
import MessagesList from "Renderer/components/rest/messages/messages-list.component"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import { basicRows } from "Renderer/components/core/table/table.fake-data"
import {
  Sidebar,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import ContactDetails from "Renderer/components/rest/phone/contact-details.component"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"

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

const searchIcon = <Icon type={Type.Magnifier} />

const Messages: FunctionComponent<MessagesProps> = ({
  searchValue,
  changeSearchValue = noop,
  changeVisibilityFilter = noop,
  list,
}) => {
  const [activeLabel, setActiveLabel] = useState(toggleState[0])

  const {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  } = useTableSidebar<{}>()

  const showAllMessages = () => {
    changeVisibilityFilter(VisibilityFilter.All)
  }

  const hideReadMessages = () => {
    changeVisibilityFilter(VisibilityFilter.Unread)
  }

  return (
    <>
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
          placeholder={intl.formatMessage({
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
          list={list}
          openSidebar={openSidebar}
          activeRow={activeRow}
        />
        {activeRow && <MessageDetails />}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
