/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { MessagesSidebar } from "App/messages/components/thread-details.styled"
import { Sidebar } from "App/__deprecated__/renderer/components/core/table/table.component"
import { isNameAvailable } from "App/__deprecated__/renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import ThreadDetailsSidebarLeftHeader from "App/messages/components/thread-details-sidebar-left-header.component"
import ThreadDetailsSidebarRightHeader from "App/messages/components/thread-details-sidebar-right-header.component"
import {
  Receiver,
  ReceiverIdentification,
} from "App/messages/reducers/messages.interface"
import { mapToRawNumber } from "App/messages/helpers"

interface Props
  extends ComponentProps<typeof Sidebar>,
    ComponentProps<typeof ThreadDetailsSidebarRightHeader> {
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
        />
      }
      {...props}
    >
      {children}
    </MessagesSidebar>
  )
}

export default ThreadDetailsSidebar
