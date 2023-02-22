/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { MessagesState } from "App/messages/components/messages/messages.enum"
import MessagesSearchResults from "App/messages/components/messages-search-results/messages-search-results.container"
import {
  EmptyState,
  TableWithSidebarWrapper,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import { defineMessages } from "react-intl"
import ThreadList from "App/messages/components/thread-list.component"
import NewMessageForm from "App/messages/components/new-message-form.component"
import ThreadDetails from "App/messages/components/thread-details.component"

const messages = defineMessages({
  emptyListTitle: {
    id: "module.messages.emptyListTitle",
  },
  emptyListDescription: {
    id: "module.messages.emptyListDescription",
  },
})

interface MessagesContentProps {
  state: MessagesState
  searchResultProps: React.ComponentProps<typeof MessagesSearchResults>
  threadListProps: React.ComponentProps<typeof ThreadList>
  newMessageFormProps: React.ComponentProps<typeof NewMessageForm>
  threadDetailsProps?: React.ComponentProps<typeof ThreadDetails>
}

const MessagesContent: FunctionComponent<MessagesContentProps> = ({
  state,
  searchResultProps,
  threadListProps,
  newMessageFormProps,
  threadDetailsProps,
}) => {
  if (state === MessagesState.SearchResult) {
    return <MessagesSearchResults {...searchResultProps} />
  }

  if (state === MessagesState.List && threadListProps.threads.length > 0) {
    return (
      <ThreadList
        {...threadListProps}
        data-testid={MessagesTestIds.ThreadList}
      />
    )
  }

  if (state === MessagesState.List) {
    return (
      <EmptyState
        data-testid={MessagesTestIds.EmptyThreadListState}
        title={messages.emptyListTitle}
        description={messages.emptyListDescription}
      />
    )
  }

  if (state === MessagesState.NewMessage) {
    return (
      <TableWithSidebarWrapper>
        <ThreadList
          {...threadListProps}
          data-testid={MessagesTestIds.ThreadList}
        />
        <NewMessageForm
          {...newMessageFormProps}
          data-testid={MessagesTestIds.NewMessageForm}
        />
      </TableWithSidebarWrapper>
    )
  }

  if (state === MessagesState.ThreadDetails && threadDetailsProps) {
    return (
      <TableWithSidebarWrapper>
        <ThreadList
          {...threadListProps}
          data-testid={MessagesTestIds.ThreadList}
        />
        <ThreadDetails
          {...threadDetailsProps}
          data-testid={MessagesTestIds.ThreadDetails}
        />
      </TableWithSidebarWrapper>
    )
  }

  if (
    state === MessagesState.ThreadDetails &&
    threadDetailsProps === undefined
  ) {
    return (
      <ThreadList
        {...threadListProps}
        data-testid={MessagesTestIds.ThreadList}
      />
    )
  }

  return null
}

export default MessagesContent
