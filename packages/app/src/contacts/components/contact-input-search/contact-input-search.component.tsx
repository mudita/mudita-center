/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import SearchableText from "Renderer/components/core/searchable-text/searchable-text.component"
import {
  ListItem,
  RenderListItem,
} from "Renderer/components/core/list/list.component"
import InputSelect from "Renderer/components/core/input-select/input-select.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { Contact } from "App/contacts/store/contacts.type"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { backgroundColor} from "Renderer/styles/theming/theme-getters"

const messages = defineMessages({
  searchPlaceholder: { id: "module.contacts.panelSearchPlaceholder" },
})

const ContactListItem = styled(ListItem)<{
  active: boolean
}>`
  display: flex;
  justify-content: space-between;
  ${({ active }) => active && css`background-color: ${backgroundColor("minor")};`};
`

const renderListItem: RenderListItem<Contact> = ({
  item,
  searchString, 
  props,
}) =>  {
  return (
  <ContactListItem {...props}>
    <span>
      <SearchableText text={createFullName(item)} search={searchString} />
    </span>
  </ContactListItem>
)}

const renderName = (contact: Contact) => createFullName(contact)

const isItemMatching = (contact: Contact, search: string) => {
  const query: string[] = ["firstName", "lastName", "primaryPhoneNumber", "secondaryPhoneNumber", "email", "firstAddressLine", "secondAddressLine" ]
  for (const key of query) {
    const param: string | boolean | number | undefined = contact[key as keyof typeof contact]
    if (param !== undefined && typeof param === "string" &&  param.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
  }
  return false 
}

export interface ContactInputSelectProps {
  contacts: Contact[]
  onContactSelect: (item: Contact) => void
}

const ContactInputSearch: FunctionComponent<ContactInputSelectProps> = ({
  contacts,
  onContactSelect,
  ...props
}) => {
  const filteredContacts = contacts.filter(
    (contact) => createFullName(contact) !== ""
  )
  const minContactNameLength = Math.min(
    ...filteredContacts.map((contact) => createFullName(contact).length)
  )
  const minCharsToShowResults = Math.min(1, minContactNameLength)

  return (
    <InputSelect
      {...props}
      onSelect={onContactSelect}
      items={filteredContacts}
      leadingIcons={[searchIcon]}
      label={intl.formatMessage(messages.searchPlaceholder)}
      renderItemValue={renderName}
      renderListItem={renderListItem}
      isItemMatching={isItemMatching}
      type="search"
      outlined
      searchable
      minCharsToShowResults={minCharsToShowResults}
      listStyles={css`
        max-height: 31.33rem;
      `}
    />
  )
}

export default ContactInputSearch
