/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactInputSearch } from "Core/contacts/components/contact-input-search"
import { ContactSimpleList } from "Core/contacts/components/contact-simple-list"
import { ContactsSelectModalProps } from "Core/contacts/components/contacts-select-modal/contacts-select-modal.interface"
import { Contact } from "Core/contacts/dto"
import {
  contactHashSelector,
  favouriteContactHashSelector,
} from "Core/contacts/selectors"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { filterContacts } from "Core/contacts/helpers/filter-contacts/filter-contacts"
import { sortByLastNameAscending } from "Core/utils/sort-by-last-name-ascending"

export const ContactSelectModal: FunctionComponent<
  ContactsSelectModalProps
> = ({
  open,
  onClose,
  onContactSelect,
  onPhoneNumberSelect,
  title,
  withPhoneNumberOnly,
  testId,
}) => {
  const contacts = useSelector(contactHashSelector(withPhoneNumberOnly))
  const favouriteContacts = useSelector(
    favouriteContactHashSelector(withPhoneNumberOnly)
  )
  const [results, setResults] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    setResults(
      filterContacts(contacts.flat().sort(sortByLastNameAscending), searchQuery)
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  return (
    <ModalDialog
      title={title}
      size={ModalSize.Medium}
      closeModal={onClose}
      closeButton={false}
      open={open}
      testId={testId}
    >
      <ContactInputSearch
        onContactSelect={onContactSelect}
        onSearchEnterClick={noop}
        showSearchResults={results.length > 0}
        searchValue={searchQuery}
        onSearchValueChange={setSearchQuery}
        results={results}
      />
      <ContactSimpleList
        contacts={contacts}
        favouriteContacts={favouriteContacts}
        onContactSelect={onPhoneNumberSelect ? undefined : onContactSelect}
        onPhoneNumberSelect={onPhoneNumberSelect}
      />
    </ModalDialog>
  )
}
