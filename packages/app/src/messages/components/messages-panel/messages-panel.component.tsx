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
  MessagesSelectionManager,
} from "App/messages/components/messages-panel/messages-panel.styled"
import { MessagePanelTestIds } from "App/messages/components/messages-panel/messages-panel-test-ids.enum"
import { MessagesPanelProps } from "App/messages/components/messages-panel/messages-panel.interface"
import { flags, Feature } from "App/feature-flags"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
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

export const MessagesPanel: FunctionComponent<MessagesPanelProps> = ({
  searchValue,
  onSearchValueChange,
  onNewMessageClick,
  buttonDisabled,
  selectedIds,
  allItemsSelected,
  toggleAll,
  onDeleteClick,
  onSearchEnterClick,
  onSelect,
  showSearchResults = false,
  showSearchResultsList = false,
  results,
}) => {
  const selectedItemsCount = selectedIds.length
  const selectionMode = selectedItemsCount > 0

  return (
    <MessageFiltersWrapper showSearchResults={showSearchResultsList}>
      {selectionMode ? (
        <MessagesSelectionManager
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
          <MessagesInputSearch
            onSelect={onSelect}
            onSearchEnterClick={onSearchEnterClick}
            searchValue={searchValue}
            onSearchValueChange={onSearchValueChange}
            showSearchResults={showSearchResults}
            results={results}
          />
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
