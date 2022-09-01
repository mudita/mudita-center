/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { css } from "styled-components"
import { defineMessages } from "react-intl"
import moment from "moment"
import { isToday } from "App/__deprecated__/renderer/utils/is-today"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { RenderListItem } from "App/__deprecated__/renderer/components/core/list/list.component"
import { Time } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import { searchIcon } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import {
  MessagesInputSelect,
  MessageListItem,
  MessageListItemContent,
  MessageListItemInfoWrapper,
  MessageListItemGroupName,
  MessageListItemWrapper,
  MessageListItemGroupWrapper,
  MessageConversationIconWrapper,
  MessageSearchResultAccent,
} from "App/messages/components/messages-input-search/messages-input-search.styled"
import { ContactName } from "App/contacts/components"
import { MessagesInputSearchProps } from "App/messages/components/messages-input-search/messages-input-search.interface"
import { Message, Thread } from "App/messages/dto"
import {
  ItemType,
  Item,
} from "App/__deprecated__/renderer/components/core/input-search/input-search.component"
import { SearchResultAccent } from "App/search/components"

const messages = defineMessages({
  threadGroup: { id: "module.messages.threadGroup" },
  conversationGroup: { id: "module.messages.conversationGroup" },
  searchPlaceholder: { id: "module.messages.search" },
  seeAll: { id: "module.messages.seeAll" },
})

const renderListItem: RenderListItem<Item<Message & Thread>> = ({
  item,
  searchString,
  props,
}) => {
  const messageContent = Boolean(item.data.content)

  if (item.type === ItemType.Data) {
    return (
      <MessageListItem {...props}>
        {!messageContent && (
          <MessageConversationIconWrapper>
            <Icon type={IconType.Conversation} width={3.2} />
          </MessageConversationIconWrapper>
        )}
        <MessageListItemWrapper>
          <MessageListItemInfoWrapper>
            <ContactName phoneNumber={item.data.phoneNumber} />
            {messageContent && (
              <Time displayStyle={TextDisplayStyle.Label} color="secondary">
                {isToday(item.data.date)
                  ? moment(item.data.date).format("h:mm A")
                  : moment(item.data.date).locale("en").format("ll")}
              </Time>
            )}
          </MessageListItemInfoWrapper>

          {messageContent ? (
            <MessageSearchResultAccent>
              <SearchResultAccent
                query={searchString}
                text={item.data.content}
              />
            </MessageSearchResultAccent>
          ) : (
            <MessageListItemContent>
              {item.data.phoneNumber}
            </MessageListItemContent>
          )}
        </MessageListItemWrapper>
      </MessageListItem>
    )
  }

  return (
    <MessageListItem {...props}>
      <MessageListItemGroupWrapper>
        <MessageListItemGroupName displayStyle={TextDisplayStyle.Label}>
          {item.data}
        </MessageListItemGroupName>
      </MessageListItemGroupWrapper>
    </MessageListItem>
  )
}

export const MessagesInputSearch: FunctionComponent<
  MessagesInputSearchProps
> = ({
  onSelect,
  onSearchEnterClick,
  showSearchResults = false,
  searchValue,
  onSearchValueChange,
  results,
  ...props
}) => {
  const minCharsToShowResults = 1
  return (
    <MessagesInputSelect
      {...props}
      onSelect={onSelect}
      items={[
        ...(results.thread?.length
          ? [
              ...results.thread.slice(0, 2).map((thread) => ({
                type: ItemType.Data,
                data: thread,
              })),
            ]
          : []),
        ...(results.message?.length
          ? [
              {
                type: ItemType.Label,
                data: intl.formatMessage(messages.conversationGroup),
              },
              ...results.message.slice(0, 3).map((message) => ({
                type: ItemType.Data,
                data: message,
              })),
            ]
          : []),
      ]}
      leadingIcons={[searchIcon]}
      label={intl.formatMessage(messages.searchPlaceholder)}
      renderItemValue={createFullName}
      renderListItem={renderListItem}
      type="search"
      outlined
      searchable
      minCharsToShowResults={minCharsToShowResults}
      listStyles={css`
        max-height: 40rem;
      `}
      onSearchEnterClick={onSearchEnterClick}
      itemListDisabled={!showSearchResults}
      searchValue={searchValue}
      onSearchValueChange={onSearchValueChange}
      actionButton={intl.formatMessage(messages.seeAll)}
      onActionButtonClick={onSearchEnterClick}
    />
  )
}
