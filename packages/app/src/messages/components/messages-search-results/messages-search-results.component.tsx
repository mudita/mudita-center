/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import {
  EmptyState,
  LoadingState,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { basicAvatarStyles } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  borderColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import useTableScrolling from "App/__deprecated__/renderer/utils/hooks/use-table-scrolling"
import { MessagesSearchResultsTestIdsEnum } from "App/messages/components/messages-search-results/messages-search-results-test-ids.enum"
import { ResultState } from "App/contacts/reducers/contacts.interface"
import { Message } from "App/messages/dto"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { Settings } from "App/settings/dto"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { Threads } from "App/messages/components/thread-list.component"
import MessagesSearchResultsItem from "./messages-search-results-item.component"

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.2rem;
`

export const SearchResultQueryWrapper = styled.div`
  padding: 0 3.2rem 1.7rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
`

export const SearchTitle = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const messages = defineMessages({
  searchResultsTitle: {
    id: "module.messages.searchResultsTitle",
  },
  dropdownTogglerTooltipDescription: {
    id: "component.dropdownTogglerTooltipDescription",
  },
})

interface MessagesSearchResultProps extends Pick<Settings, "language"> {
  resultsState: ResultState
  results: Message[]
  searchValue: string
  onRowClick: (message: Message) => void
  removeMessage: (messageId: string) => void
  resendMessage?: (messageId: string) => void
  getContactByPhoneNumberId: (phoneNumberId: string) => Contact | undefined
}

const MessagesSearchResults: FunctionComponent<MessagesSearchResultProps> = ({
  results,
  resultsState,
  searchValue,
  language,
  onRowClick,
  removeMessage = noop,
  resendMessage = noop,
  getContactByPhoneNumberId,
}) => {
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()

  const emptyList = () => (
    <EmptyState
      title={{ id: "module.messages.emptyResultsListTitle" }}
      description={{
        id: "module.messages.emptyResultsListDescription",
      }}
      data-testid={MessagesSearchResultsTestIdsEnum.Empty}
    />
  )

  return (
    <>
      <SearchResultQueryWrapper>
        <SearchTitle displayStyle={TextDisplayStyle.Headline4}>
          {intl.formatMessage(messages.searchResultsTitle, {
            value: searchValue,
          })}
        </SearchTitle>
      </SearchResultQueryWrapper>

      <Threads
        scrollable={scrollable}
        data-testid={MessagesSearchResultsTestIdsEnum.Table}
      >
        {resultsState === ResultState.Loaded &&
          (results.length
            ? results.map((message) => {
                return (
                  <MessagesSearchResultsItem
                    key={message.id}
                    message={message}
                    onRowClick={onRowClick}
                    removeMessage={removeMessage}
                    resendMessage={resendMessage}
                    disableScroll={disableScroll}
                    enableScroll={enableScroll}
                    language={language}
                  />
                )
              })
            : emptyList())}
        {resultsState === ResultState.Empty && emptyList()}
        {resultsState === ResultState.Loading && (
          <LoadingState
            data-testid={MessagesSearchResultsTestIdsEnum.Loading}
          />
        )}
      </Threads>
    </>
  )
}

export default MessagesSearchResults
