/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { UnreadFilters } from "Renderer/components/rest/messages/threads-table.component"
import ButtonToggler from "Renderer/components/core/button-toggler/button-toggler.component"
import { intl } from "Renderer/utils/intl"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
// import Button from "Renderer/components/core/button/button.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  // Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  // ButtonWrapper,
  MessageFiltersWrapper,
  MessagesButtonTogglerItem,
  MessageSelectionManager,
  SearchInput,
} from "App/messages/components/messages-panel.styled"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { defineMessages } from "react-intl"
import { Thread, VisibilityFilter } from "App/messages/store/messages.interface"

const toggleState = [
  intl.formatMessage({
    id: "view.name.messages.allMessages",
  }),
  intl.formatMessage({
    id: "view.name.messages.unreadOnly",
  }),
] as const

const messages = defineMessages({
  markAsReadButton: { id: "view.name.messages.markAsRead" },
  deleteButton: {
    id: "view.name.messages.deleteButton",
  },
})

interface Props {
  showAllMessages?: () => void
  hideReadMessages?: () => void
  selectedConversations: Thread[]
  deleteThreads: (ids: string[]) => void
  searchValue: string
  changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Thread>["toggleAll"]
  resetRows: UseTableSelect<Thread>["resetRows"]
  visibilityFilter?: VisibilityFilter
  onMarkAsRead: (ids: string[]) => void
  onDeleteClick: () => void
}

const MessagesPanel: FunctionComponent<Props> = ({
  showAllMessages = noop,
  hideReadMessages = noop,
  searchValue,
  changeSearchValue,
  allItemsSelected,
  toggleAll = noop,
  selectedConversations,
  resetRows,
  visibilityFilter,
  onMarkAsRead,
  onDeleteClick,
}) => {
  const [activeLabel, setActiveLabel] = useState(toggleState[0])
  const selectionMode = selectedConversations.length > 0

  const markAsRead = () => {
    const selectedConversationsIds = selectedConversations.map(({ id }) => id)
    onMarkAsRead(selectedConversationsIds)
    resetRows()
  }

  const selectionManagerButtons = [
    <ButtonComponent
      key="read"
      label={intl.formatMessage(messages.markAsReadButton)}
      displayStyle={DisplayStyle.Link1}
      Icon={Type.MarkAsRead}
      onClick={markAsRead}
      data-testid={MessagePanelTestIds.SelectionManagerMarkAsReadButton}
    />,
    <ButtonComponent
      key="delete"
      label={intl.formatMessage(messages.deleteButton)}
      displayStyle={DisplayStyle.Link1}
      Icon={Type.Delete}
      onClick={onDeleteClick}
      data-testid={MessagePanelTestIds.SelectionManagerDeleteButton}
    />,
  ]
  return (
    <MessageFiltersWrapper selectionMode={selectionMode}>
      {!selectionMode && (
        <UnreadFilters data-testid={MessagePanelTestIds.FilterButtons}>
          <ButtonToggler>
            {/* TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802 */}
            {process.env.NODE_ENV !== "production" &&
              toggleState.map((label, i) => {
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
          selectedItemsNumber={selectedConversations.length}
          allItemsSelected={Boolean(allItemsSelected)}
          message={{ id: "view.name.messages.conversations.selectionsNumber" }}
          checkboxSize={Size.Large}
          onToggle={toggleAll}
          buttons={
            visibilityFilter === VisibilityFilter.Unread
              ? selectionManagerButtons
              : [selectionManagerButtons[1]]
          }
          data-testid={MessagePanelTestIds.SelectionManager}
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
      {/* TODO: Remove when add feature becomes available */}
      {/*<ButtonWrapper>*/}
      {/*  <Button*/}
      {/*    displayStyle={DisplayStyle.Primary}*/}
      {/*    size={ButtonSize.FixedBig}*/}
      {/*    label={intl.formatMessage({*/}
      {/*      id: "view.name.messages.newMessage",*/}
      {/*    })}*/}
      {/*    onClick={noop}*/}
      {/*    Icon={Type.PlusSign}*/}
      {/*  />*/}
      {/*</ButtonWrapper>*/}
    </MessageFiltersWrapper>
  )
}

export default MessagesPanel
