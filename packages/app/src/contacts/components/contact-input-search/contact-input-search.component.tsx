/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import {
  ListItem,
  RenderListItem,
} from "Renderer/components/core/list/list.component"
import InputSelect from "Renderer/components/core/input-select/input-select.component"
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
const ContactInputSelect = styled(InputSelect)`
  width: 28rem;
`
const ContactListItemName = styled(Text)`
  font-weight: 400;
  margin-bottom: 0.4rem;
`
const renderListItem: RenderListItem<Contact> = ({ item, props }) => (
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
        {secondParam(item)}
      </Text>
    </span>
  </ContactListItem>
)

const renderPhoneNumber = (number: string) => {
  if (number.length === 12) {
    return number.replace(/(.{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")
  }
  return null
}

const renderName = (contact: Contact) => createFullName(contact)
export const secondParam = (item: Contact) => {
  if (item.primaryPhoneNumber) {
    return renderPhoneNumber(item.primaryPhoneNumber)
  } else if (item.secondaryPhoneNumber) {
    return renderPhoneNumber(item.secondaryPhoneNumber)
  } else if (item.email) {
    return item.email
  } else if (item.firstAddressLine) {
    return `${item.firstAddressLine} ${item.secondAddressLine}`
  } else if (item.secondAddressLine) {
    return item.secondAddressLine
  }
  return intl.formatMessage(messages.noDataProvided)
}
export const isItemMatching = (contact: Contact, search: string) => {
  const query: (keyof Contact)[] = [
    "firstName",
    "lastName",
    "primaryPhoneNumber",
    "secondaryPhoneNumber",
    "email",
    "firstAddressLine",
    "secondAddressLine",
  ]
  for (const key of query) {
    const param: typeof contact[keyof typeof contact] = contact[key]
    if (
      param !== undefined &&
      typeof param === "string" &&
      param.toLowerCase().includes(search.toLowerCase())
    ) {
      return true
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
      isItemMatching={isItemMatching}
      type="search"
      outlined
      searchable
      minCharsToShowResults={minCharsToShowResults}
      listStyles={css`
        max-height: 40rem;
      `}
    />
  )
}

export default ContactInputSearch
