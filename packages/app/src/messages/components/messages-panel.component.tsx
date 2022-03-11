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

const messages = defineMessages({
  search: { id: "module.messages.search" },
  newMessage: {
    id: "module.messages.newMessage",
  },
})

interface Props {
  searchValue: string
  onSearchValueChange: (event: ChangeEvent<HTMLInputElement>) => void
  onNewMessageClick: () => void
  buttonDisabled: boolean
}

const MessagesPanel: FunctionComponent<Props> = ({
  searchValue,
  onSearchValueChange,
  onNewMessageClick,
  buttonDisabled,
}) => {
  return (
    <MessageFiltersWrapper>
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
    </MessageFiltersWrapper>
  )
}

export default MessagesPanel
