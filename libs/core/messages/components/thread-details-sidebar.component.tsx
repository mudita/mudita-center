/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { MessagesSidebar } from "Core/messages/components/thread-details.styled"
import { Sidebar } from "Core/__deprecated__/renderer/components/core/table/table.component"
import { isNameAvailable } from "Core/__deprecated__/renderer/components/rest/messages/is-name-available"
import { createFullName } from "Core/contacts/helpers/contacts.helpers"
import ThreadDetailsSidebarLeftHeader from "Core/messages/components/thread-details-sidebar-left-header.component"
import ThreadDetailsSidebarRightHeader from "Core/messages/components/thread-details-sidebar-right-header.component"
import {
  Receiver,
  ReceiverIdentification,
} from "Core/messages/reducers/messages.interface"
import { mapToRawNumber } from "Core/messages/helpers"
import { isPhoneNumberValid } from "Core/messages/helpers/threads.helpers"

type SidebarProps = ComponentProps<typeof Sidebar>
type ThreadDetailsRightHeaderProps = ComponentProps<
  typeof ThreadDetailsSidebarRightHeader
>

interface Props
  extends SidebarProps,
    Omit<ThreadDetailsRightHeaderProps, "validPhoneNumber"> {
  receiver: Receiver
}

const getCallerIdentification = (receiver: Receiver): string | undefined => {
  if (receiver.identification === ReceiverIdentification.primary) {
    return "#1"
  } else if (receiver.identification === ReceiverIdentification.secondary) {
    return "#2"
  } else {
    return undefined
  }
}

const ThreadDetailsSidebar: FunctionComponent<Props> = ({
  receiver,
  contactCreated,
  onContactClick,
  onDeleteClick,
  onMarkAsUnreadClick,
  emptyThread,
  children,
  ...props
}) => {
  const nameAvailable = isNameAvailable(receiver)
  const prettyCaller = nameAvailable
    ? createFullName(receiver)
    : mapToRawNumber(receiver.phoneNumber)
  const callerNumber = nameAvailable ? receiver.phoneNumber : undefined

  return (
    <MessagesSidebar
      show
      withBottomBorder
      padded={false}
      headerLeft={
        <ThreadDetailsSidebarLeftHeader
          callerIdentification={getCallerIdentification(receiver)}
          prettyCaller={prettyCaller}
          callerNumber={callerNumber}
        />
      }
      headerRight={
        <ThreadDetailsSidebarRightHeader
          contactCreated={contactCreated}
          onContactClick={onContactClick}
          onDeleteClick={onDeleteClick}
          onMarkAsUnreadClick={onMarkAsUnreadClick}
          emptyThread={emptyThread}
          validPhoneNumber={isPhoneNumberValid(receiver.phoneNumber)}
        />
      }
      {...props}
    >
      {children}
    </MessagesSidebar>
  )
}

export default ThreadDetailsSidebar
