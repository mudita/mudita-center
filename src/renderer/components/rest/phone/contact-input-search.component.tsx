import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
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
import { Contact, ContactCategory } from "Renderer/models/phone/phone.typings"
import { createFullName } from "Renderer/models/phone/phone.helpers"

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

interface ContextValue {
  contactList: ContactCategory[]
  selectedContact: Contact | null
  setSelectedContact: (contact: Contact | null) => void
}

const ContactInputSearchContext = createContext<ContextValue | null>(null)

export function useContactInputSearch() {
  const context = useContext(ContactInputSearchContext)

  if (!context) {
    throw new Error(
      "useContactInputSearch must be used within a ContactInputSearchProvider"
    )
  }

  return context
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
  const { setSelectedContact } = useContactInputSearch()

  const filteredContacts = contacts.filter(
    (contact) => createFullName(contact) !== ""
  )
  const minContactNameLength = Math.min(
    ...filteredContacts.map((contact) => createFullName(contact).length)
  )
  const minCharsToShowResults = Math.min(3, minContactNameLength)

  const handleContactSelect = (contact: Contact) => {
    console.log("handleContactSelect: ", contact)
    onContactSelect(contact)
    setSelectedContact(contact)
  }

  return (
    <InputSelect
      {...props}
      onSelect={handleContactSelect}
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

export const ContactListContainer: FunctionComponent = ({ children, ...props }) => {
  const {
    contactList,
    selectedContact,
    setSelectedContact,
  } = useContactInputSearch()
  const listRef = useRef<HTMLDivElement>(null)
  const highlightActiveEventTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    console.log("selectedContact: ", selectedContact)
    if (selectedContact) {
      let contactIndex = -1
      const categoryIndex = contactList.findIndex(({ contacts }) => {
        contactIndex = contacts.indexOf(selectedContact)
        return contactIndex !== -1
      })

      if (categoryIndex >= 0) {
        listRef.current?.children[categoryIndex].children[
          contactIndex
        ].scrollIntoView({
          behavior: "smooth",
          block: "center",
        })

        highlightActiveEventTimeout.current = setTimeout(() => {
          setSelectedContact(null)
        }, 3500)
      }
    }
    return () => {
      if (highlightActiveEventTimeout.current) {
        clearTimeout(highlightActiveEventTimeout.current)
      }
    }
  }, [selectedContact])

  return <div ref={listRef} {...props}>{children}</div>
}

export const ContactInputSearchProvider: FunctionComponent<{
  contactList: ContactCategory[]
}> = ({ contactList, children }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const context = { contactList, selectedContact, setSelectedContact }

  return (
    <ContactInputSearchContext.Provider value={context}>
      {children}
    </ContactInputSearchContext.Provider>
  )
}

export default ContactInputSearch
