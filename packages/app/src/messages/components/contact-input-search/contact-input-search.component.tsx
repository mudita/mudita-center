/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import InputSearch from "Renderer/components/core/input-search/input-search.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { Contact } from "App/contacts/store/contacts.type"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { renderListItem } from "App/messages/components/contact-input-search/contact-input-search.helpers"

const messages = defineMessages({
  searchPlaceholder: { id: "module.contacts.panelSearchPlaceholder" },
})

const ContactInputSelectListStyles = css`
  max-height: 40rem;
`

const ContactInputSelect = styled(InputSearch)`
  width: 28rem;
`

type InputSearchProps = Omit<
  ComponentProps<typeof InputSearch>,
  "results" | "items" | "type"
>

interface Props extends InputSearchProps {
  results: Contact[]
  searchValue: string
  showSearchResults?: boolean
}

const ContactInputSearch: FunctionComponent<Props> = ({
  results,
  showSearchResults = false,
  minCharsToShowResults = 1,
  ...props
}) => {
  return (
    <ContactInputSelect
      type="search"
      outlined
      searchable
      items={results}
      leadingIcons={[searchIcon]}
      label={intl.formatMessage(messages.searchPlaceholder)}
      renderItemValue={createFullName}
      renderListItem={renderListItem}
      listStyles={ContactInputSelectListStyles}
      minCharsToShowResults={minCharsToShowResults}
      itemListDisabled={showSearchResults}
      {...props}
    />
  )
}

export default ContactInputSearch
