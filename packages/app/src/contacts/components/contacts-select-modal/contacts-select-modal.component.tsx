/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { defineMessages } from "react-intl"
import { useSelector } from "react-redux"
import { contactHashSelector } from "App/contacts/selectors"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { Contact } from "App/contacts/dto"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ContactsSelectModalProps } from "App/contacts/components/contacts-select-modal/contacts-select-modal.interface"
import { ContactSimpleList } from "App/contacts/components/contact-simple-list"
import { ContactInputSearch } from "App/contacts/components/contact-input-search"

const messages = defineMessages({
  title: { id: "module.messagesAttachModalTitle" },
  unnamedContact: { id: "module.contacts.listUnnamedContact" },
  emptyListTitle: { id: "module.contacts.emptyListTitle" },
  emptySearchDescription: { id: "module.contacts.emptySearchDescription" },
})

export const isContactMatching = (
  contact: Contact,
  search: string
): boolean => {
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
    const fullNameMatchContact = createFullName(contact)
      .toLowerCase()
      .includes(search.toLowerCase())
    if (
      (param !== undefined &&
        typeof param === "string" &&
        param.toLowerCase().includes(search.toLowerCase())) ||
      fullNameMatchContact
    ) {
      return true
    }
  }
  return false
}

export const ContactSelectModal: FunctionComponent<
  ContactsSelectModalProps
> = ({ open, onClose, onSelect }) => {
  const contacts = useSelector(contactHashSelector)
  const [results, setResults] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    setResults(
      contacts
        .flat()
        .filter((item) => isContactMatching(item, searchQuery || ""))
    )
  }, [searchQuery])

  return (
    <ModalDialog
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Medium}
      closeModal={onClose}
      closeButton={false}
      open={open}
    >
      <ContactInputSearch
        onContactSelect={onSelect}
        onSearchEnterClick={console.log}
        showSearchResults
        searchValue={searchQuery}
        onSearchValueChange={setSearchQuery}
        results={results}
      />
      <ContactSimpleList contacts={contacts} onSelect={onSelect} />
    </ModalDialog>
  )
}
