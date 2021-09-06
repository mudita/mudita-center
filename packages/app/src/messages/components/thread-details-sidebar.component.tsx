/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { MessagesSidebar } from "App/messages/components/thread-details.styled"
import { Sidebar } from "Renderer/components/core/table/table.component"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { Contact } from "App/contacts/store/contacts.type"
import ThreadDetailsSidebarLeftHeader from "App/messages/components/thread-details-sidebar-left-header.component"
import ThreadDetailsSidebarRightHeader from "App/messages/components/thread-details-sidebar-right-header.component"

interface Props
  extends ComponentProps<typeof Sidebar>,
    ComponentProps<typeof ThreadDetailsSidebarRightHeader> {
  contact?: Contact
  phoneNumber: string
}

const getCallerIdentification = (
  contact: Contact | undefined,
  phoneNumber: string
): string | undefined => {
  if (Boolean(phoneNumber) && contact?.secondaryPhoneNumber) {
    return phoneNumber.split(" ").join("") ===
      contact.secondaryPhoneNumber.split(" ").join("")
      ? "#2"
      : "#1"
  } else {
    return undefined
  }
}

const ThreadDetailsSidebar: FunctionComponent<Props> = ({
  contact,
  phoneNumber,
  contactCreated,
  onContactClick,
  onDeleteClick,
  onCheckClick,
  children,
  ...props
}) => {
  const nameAvailable = isNameAvailable(contact)

  return (
    <MessagesSidebar
      show
      withBottomBorder
      padded={false}
      headerLeft={
        <ThreadDetailsSidebarLeftHeader
          callerIdentification={getCallerIdentification(contact, phoneNumber)}
          prettyCaller={nameAvailable ? createFullName(contact) : phoneNumber}
          callerNumber={nameAvailable ? phoneNumber : undefined}
        />
      }
      headerRight={
        <ThreadDetailsSidebarRightHeader
          contactCreated={contactCreated}
          onContactClick={onContactClick}
          onDeleteClick={onDeleteClick}
          onCheckClick={onCheckClick}
        />
      }
      {...props}
    >
      {children}
    </MessagesSidebar>
  )
}

export default ThreadDetailsSidebar
