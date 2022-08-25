/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import {
  ButtonWrapper,
  MessageFiltersWrapper,
} from "App/messages/components/messages-panel.styled"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { flags, Feature } from "App/feature-flags"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { ContactSelectionManager } from "App/contacts/components/contact-panel/contact-panel.styled"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { UseTableSelect } from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { Message, Thread } from "App/messages/dto"
import { MessagesInputSearch } from "App/messages/components/messages-input-search/messages-input-search.component"

const messages = defineMessages({
  search: { id: "module.messages.search" },
  newMessage: {
    id: "module.messages.newMessage",
  },
  delete: {
    id: "module.messages.deleteButton",
  },
  searchResultsTitle: {
    id: "module.messages.searchResultsTitle",
  },
})

interface Props {
  searchValue: string
  onSearchValueChange: (value: string) => void
  onNewMessageClick: () => void
  buttonDisabled: boolean
  selectedIds: string[]
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Thread>["toggleAll"]
  onDeleteClick: () => void
  onSearchEnterClick?: () => void
  onSelect: (thread: Thread) => void
  showSearchResults?: boolean
  results: { messages: Message[]; threads: Thread[] }
}

const MessagesPanel: FunctionComponent<Props> = ({
  searchValue,
  onSearchValueChange,
  onNewMessageClick,
  buttonDisabled,
  selectedIds,
  allItemsSelected,
  toggleAll,
  onDeleteClick,
  onSearchEnterClick = noop,
  onSelect,
  showSearchResults = false,
  results,
}) => {
  const selectedItemsCount = selectedIds.length
  const selectionMode = selectedItemsCount > 0

  return (
    <MessageFiltersWrapper showSearchResults={showSearchResults}>
      {selectionMode ? (
        <ContactSelectionManager
          selectedItemsNumber={selectedItemsCount}
          allItemsSelected={Boolean(allItemsSelected)}
          message={{ id: "module.messages.selectionNumber" }}
          checkboxSize={Size.Medium}
          onToggle={toggleAll}
          data-testid={MessagePanelTestIds.SelectionManager}
          buttons={[
            <ButtonComponent
              key="delete"
              labelMessage={messages.delete}
              displayStyle={DisplayStyle.Link}
              Icon={IconType.Delete}
              onClick={onDeleteClick}
            />,
          ]}
        />
      ) : (
        <>
          {flags.get(Feature.MessagesSearchEnabled) && (
            <MessagesInputSearch
              onSelect={onSelect}
              onSearchEnterClick={onSearchEnterClick}
              searchValue={searchValue}
              onSearchValueChange={onSearchValueChange}
              showSearchResults={showSearchResults}
              results={results}
            />
          )}
          <ButtonWrapper>
            <Button
              data-testid={MessagePanelTestIds.NewMessageButton}
              displayStyle={DisplayStyle.Primary}
              labelMessage={messages.newMessage}
              onClick={onNewMessageClick}
              disabled={buttonDisabled}
            />
          </ButtonWrapper>
        </>
      )}
    </MessageFiltersWrapper>
  )
}

export default MessagesPanel
