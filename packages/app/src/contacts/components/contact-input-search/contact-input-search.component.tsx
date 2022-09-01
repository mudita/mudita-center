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
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { formatPhoneNumber } from "App/contacts/helpers/format-phone-number/format-phone-number"
import {
  ContactInputSelect,
  ContactListItem,
  ContactListItemName,
} from "App/contacts/components/contact-input-search/contact-input-search.styled"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { ContactInputSelectTestIds } from "App/contacts/components/contact-input-search/contact-input-select-test-ids.enum"
import { ContactInputSearchProps } from "App/contacts/components/contact-input-search/contact-input-search.interface"

import {
  ItemType,
  Item,
} from "App/__deprecated__/renderer/components/core/input-search/input-search.component"

const messages = defineMessages({
  searchPlaceholder: { id: "module.contacts.panelSearchPlaceholder" },
  noNameProvided: { id: "module.contacts.panelSearchListNoName" },
  noDataProvided: { id: "module.contacts.panelSearchListNoData" },
})

const renderListItem: RenderListItem<Item<Contact>> = ({
  item,
  searchString,
  props,
}) => (
  <ContactListItem {...props}>
    <span>
      {createFullName(item.data) ? (
        <ContactListItemName displayStyle={TextDisplayStyle.Paragraph3}>
          {createFullName(item.data)}
        </ContactListItemName>
      ) : (
        <ContactListItemName
          displayStyle={TextDisplayStyle.Paragraph3}
          color="secondary"
        >
          {intl.formatMessage(messages.noNameProvided)}
        </ContactListItemName>
      )}
      <Text color="secondary" displayStyle={TextDisplayStyle.Paragraph4}>
        {secondParam(item.data, searchString)}
      </Text>
    </span>
  </ContactListItem>
)

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
          ? formatPhoneNumber(param)
          : param
      return value
    }
  }
  if (contact.primaryPhoneNumber) {
    return formatPhoneNumber(contact.primaryPhoneNumber)
  } else if (contact.secondaryPhoneNumber) {
    return formatPhoneNumber(contact.secondaryPhoneNumber)
  } else if (contact.email) {
    return contact.email
  } else if (contact.firstAddressLine) {
    return contact.firstAddressLine
  } else if (contact.secondAddressLine) {
    return contact.secondAddressLine
  }
  return intl.formatMessage(messages.noDataProvided)
}

export const ContactInputSearch: FunctionComponent<ContactInputSearchProps> = ({
  onContactSelect,
  onSearchEnterClick,
  showSearchResults = false,
  searchValue,
  onSearchValueChange,
  results,
  ...props
}) => {
  const minCharsToShowResults = 1
  return (
    <ContactInputSelect
      {...props}
      onSelect={onContactSelect}
      items={[
        ...results.map((contact) => ({
          type: ItemType.Data,
          data: contact,
        })),
      ]}
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
      data-testid={ContactInputSelectTestIds.Input}
    />
  )
}
