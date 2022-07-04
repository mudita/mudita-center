/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { defineMessages } from "react-intl"
import { useSelector } from "react-redux"
import { contactHashSelector } from "App/contacts/selectors"
import { Contact } from "App/contacts/dto"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ContactsSelectModalProps } from "App/contacts/components/contacts-select-modal/contacts-select-modal.interface"
import { ContactSimpleList } from "App/contacts/components/contact-simple-list"
import { ContactInputSearch } from "App/contacts/components/contact-input-search"
import { contactsFilter } from "App/contacts/helpers/contacts-filter/contacts-filter.helper"

const messages = defineMessages({
  title: { id: "module.messagesAttachModalTitle" },
  unnamedContact: { id: "module.contacts.listUnnamedContact" },
  emptyListTitle: { id: "module.contacts.emptyListTitle" },
  emptySearchDescription: { id: "module.contacts.emptySearchDescription" },
})

export const ContactSelectModal: FunctionComponent<
  ContactsSelectModalProps
> = ({ open, onClose, onSelect }) => {
  const contacts = useSelector(contactHashSelector)
  const [results, setResults] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    setResults(
      contacts.flat().filter((item) => contactsFilter(item, searchQuery || ""))
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
        onSearchEnterClick={noop}
        showSearchResults={results.length > 0}
        searchValue={searchQuery}
        onSearchValueChange={setSearchQuery}
        results={results}
      />
      <ContactSimpleList contacts={contacts} onSelect={onSelect} />
    </ModalDialog>
  )
}
