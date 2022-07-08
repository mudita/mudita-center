/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactInputSearch } from "App/contacts/components/contact-input-search"
import { ContactSimpleList } from "App/contacts/components/contact-simple-list"
import { ContactsSelectModalProps } from "App/contacts/components/contacts-select-modal/contacts-select-modal.interface"
import { Contact } from "App/contacts/dto"
import { contactsFilter } from "App/contacts/helpers/contacts-filter/contacts-filter.helper"
import { contactHashSelector } from "App/contacts/selectors"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

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
  const [results, setResults] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    setResults(
      contacts.flat().filter((item) => contactsFilter(item, searchQuery || ""))
    )
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
        onContactSelect={onPhoneNumberSelect ? undefined : onContactSelect}
        onPhoneNumberSelect={onPhoneNumberSelect}
      />
    </ModalDialog>
  )
}
