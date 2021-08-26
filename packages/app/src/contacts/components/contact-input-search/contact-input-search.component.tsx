/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Dispatch, SetStateAction } from "react"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import {
  ListItem,
  RenderListItem,
} from "Renderer/components/core/list/list.component"
import InputSearch from "Renderer/components/core/input-search/input-search.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { Contact } from "App/contacts/store/contacts.type"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const messages = defineMessages({
  searchPlaceholder: { id: "module.contacts.panelSearchPlaceholder" },
  noNameProvided: { id: "module.contacts.panelSearchListNoNam " },
  noDataProvided: { id: "module.contacts.panelSearchListNoData" },
})

const ContactListItem = styled(ListItem)<{
  active: boolean
}>`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1.6rem;
  :not(:last-of-type) {
    border-bottom: none;
  }
  :first-of-type {
    padding-top: 1.6rem;
  }
  :last-of-type {
    padding-bottom: 1.6rem;
  }
  ${({ active }) =>
    active &&
    css`
      background-color: ${backgroundColor("minor")};
    `};
`
const ContactInputSelect = styled(InputSearch)`
  width: 28rem;
`
const ContactListItemName = styled(Text)`
  font-weight: 400;
  margin-bottom: 0.4rem;
`
const renderListItem: RenderListItem<Contact> = ({
  item,
  searchString,
  props,
}) => (
  <ContactListItem {...props}>
    <span>
      {createFullName(item) ? (
        <ContactListItemName displayStyle={TextDisplayStyle.MediumText}>
          {createFullName(item)}
        </ContactListItemName>
      ) : (
        <ContactListItemName displayStyle={TextDisplayStyle.MediumFadedText}>
          {intl.formatMessage(messages.noNameProvided)}
        </ContactListItemName>
      )}
      <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
        {secondParam(item, searchString)}
      </Text>
    </span>
  </ContactListItem>
)

export const renderPhoneNumber = (number: string): string => {
  if (number.length === 12) {
    return number.replace(/(.{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")
  } else if (number.length === 9) {
    return number.replace(/(.{3})(\d{3})(\d{3})/, "$1 $2 $3")
  }
  return number
}

const renderName = (contact: Contact) => createFullName(contact)

export const secondParam = (contact: Contact, search: string): string => {
  const query: (keyof Contact)[] = [
    "primaryPhoneNumber",
    "secondaryPhoneNumber",
    "email",
    "firstAddressLine",
    "secondAddressLine",
  ]
  for (const key of query) {
    const param: typeof contact[keyof typeof contact] =
      contact === undefined ? undefined : contact[key]
    if (
      param !== undefined &&
      typeof param === "string" &&
      param.toLowerCase().includes(search.toLowerCase())
    ) {
      const value =
        key === "primaryPhoneNumber" || key === "secondaryPhoneNumber"
          ? renderPhoneNumber(param)
          : param
      return value
    }
  }
  if (contact.primaryPhoneNumber) {
    return renderPhoneNumber(contact.primaryPhoneNumber)
  } else if (contact.secondaryPhoneNumber) {
    return renderPhoneNumber(contact.secondaryPhoneNumber)
  } else if (contact.email) {
    return contact.email
  } else if (contact.firstAddressLine) {
    return contact.firstAddressLine
  } else if (contact.secondAddressLine) {
    return contact.secondAddressLine
  }
  return intl.formatMessage(messages.noDataProvided)
}
export interface ContactInputSearchProps {
  contacts: Contact[]
  onContactSelect: (item: Contact) => void
  openSearchResults: () => void
  showSearchResults?: boolean
  searchValue: string | null
  onChangeSearchValue: Dispatch<SetStateAction<string | null>>
  resultsList: Contact[]
}

const ContactInputSearch: FunctionComponent<ContactInputSearchProps> = ({
  contacts,
  onContactSelect,
  openSearchResults,
  showSearchResults = false,
  searchValue,
  onChangeSearchValue,
  resultsList,
  ...props
}) => {
  const minCharsToShowResults = 1
  return (
    <ContactInputSelect
      {...props}
      onSelect={onContactSelect}
      items={contacts}
      leadingIcons={[searchIcon]}
      label={intl.formatMessage(messages.searchPlaceholder)}
      renderItemValue={renderName}
      renderListItem={renderListItem}
      type="search"
      outlined
      searchable
      minCharsToShowResults={minCharsToShowResults}
      listStyles={css`
        max-height: 40rem;
      `}
      openSearchResults={openSearchResults}
      itemListDisabled={showSearchResults}
      searchValue={searchValue}
      onChangeSearchValue={onChangeSearchValue}
      resultsList={resultsList}
    />
  )
}

export default ContactInputSearch
