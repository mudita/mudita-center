/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { css } from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { RenderListItem } from "App/__deprecated__/renderer/components/core/list/list.component"
import { searchIcon } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { MessagesInputSelect } from "App/messages/components/messages-input-search/messages-input-search.styled"
import { MessagesInputSearchProps } from "App/messages/components/messages-input-search/messages-input-search.interface"
import { Message } from "App/messages/dto"

const messages = defineMessages({
  searchPlaceholder: { id: "module.messages.search" },
})

const renderListItem: RenderListItem<Message> = ({ item, props }) => (
  <li {...props}>{item.content}</li>
)

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
      items={results.message ? results.message : []}
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
    />
  )
}
