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

const messages = defineMessages({
  searchPlaceholder: { id: "view.name.phone.contacts.panel.searchPlaceholder" },
})

const ContactListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`

const renderListItem: RenderListItem<Contact> = ({
  item,
  searchString,
  props,
}) => (
  <ContactListItem {...props}>
    <span>
      <SearchableText text={createFullName(item)} search={searchString} />
    </span>
  </ContactListItem>
)

const renderName = (contact: Contact) => createFullName(contact)

const isItemMatching = (contact: Contact, search: string) => {
  return createFullName(contact).toLowerCase().includes(search.toLowerCase())
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
  const minCharsToShowResults = Math.min(3, minContactNameLength)

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
        max-height: 11.75rem;
      `}
    />
  )
}

export default ContactInputSearch
