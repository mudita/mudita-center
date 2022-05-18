/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import {
  ButtonWrapper,
  MessageFiltersWrapper,
  SearchInput,
} from "App/messages/components/messages-panel.styled"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { flags, Feature } from "App/feature-flags"
import { Thread } from "App/messages/reducers/messages.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { ContactSelectionManager } from "App/contacts/components/contact-panel/contact-panel.styled"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { IconType } from "Renderer/components/core/icon/icon-type"

const messages = defineMessages({
  search: { id: "module.messages.search" },
  newMessage: {
    id: "module.messages.newMessage",
  },
  delete: {
    id: "module.messages.deleteButton",
  },
})

interface Props {
  searchValue: string
  onSearchValueChange: (event: ChangeEvent<HTMLInputElement>) => void
  onNewMessageClick: () => void
  buttonDisabled: boolean
  selectedThreads: Thread[]
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Thread>["toggleAll"]
  onDeleteClick: () => void
}

const MessagesPanel: FunctionComponent<Props> = ({
  searchValue,
  onSearchValueChange,
  onNewMessageClick,
  buttonDisabled,
  selectedThreads,
  allItemsSelected,
  toggleAll,
  onDeleteClick,
}) => {
  const selectedItemsCount = selectedThreads.length
  const selectionMode = selectedItemsCount > 0

  return (
    <MessageFiltersWrapper>
      {selectionMode ? (
        <ContactSelectionManager
          selectedItemsNumber={selectedItemsCount}
          allItemsSelected={Boolean(allItemsSelected)}
          message={{ id: "module.contacts.selectionsNumber" }}
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
          {flags.get(Feature.MessagesSearch) && (
            <SearchInput
              type={"search"}
              label={intl.formatMessage(messages.search)}
              outlined
              defaultValue={searchValue}
              onChange={onSearchValueChange}
              leadingIcons={[searchIcon]}
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
