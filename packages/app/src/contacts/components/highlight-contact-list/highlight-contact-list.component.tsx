/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import React, { useEffect, useRef } from "react"
import { HighLightContactListWrapper } from "App/contacts/components/highlight-contact-list/highlight-contact-list.styled"
import {
  Contact,
  ContactCategory,
} from "App/contacts/reducers/contacts.interface"

interface Props {
  contactList: ContactCategory[]
  selectedContact: Contact | null
  clearSelectedContact?: (contact: Contact | null) => void
}

export const HighlightContactList: FunctionComponent<Props> = ({
  children,
  contactList,
  selectedContact,
  clearSelectedContact = noop,
  ...props
}) => {
  const listRef = useRef<HTMLDivElement>(null)
  const highlightActiveEventTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
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
          clearSelectedContact(null)
        }, 3500)
      }
    }
    return () => {
      if (highlightActiveEventTimeout.current) {
        clearTimeout(highlightActiveEventTimeout.current)
      }
    }
  }, [selectedContact])

  return (
    <HighLightContactListWrapper ref={listRef} {...props}>
      {children}
    </HighLightContactListWrapper>
  )
}
