/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/reducers/contacts.interface"
import { Message } from "App/__deprecated__/renderer/interfaces/message.interface"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export enum CallStatus {
  Missed,
  Incoming,
  Conference,
  Outgoing,
}

export enum VisibilityFilter {
  All = "all",
  Received = "received",
  Missed = "missed",
}

export interface Caller extends Pick<Contact, "id" | "firstName" | "lastName"> {
  phoneNumber: string
  secondaryPhoneNumber?: string
}

export interface Call {
  id: string
  caller: Caller
  duration: number
  date: Date
  icon: IconType
  timesMissed: number
  status: CallStatus
  description: Message
}

export interface StateProps {
  calls: Call[]
  visibilityFilter?: VisibilityFilter
}
