import { Contact, ContactCategory } from "Renderer/models/phone/phone.typings"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import React, { useEffect, useRef } from "react"

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
    <div ref={listRef} {...props}>
      {children}
    </div>
  )
}
