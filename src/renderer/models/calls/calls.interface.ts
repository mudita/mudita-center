import { Contact } from "App/contacts/store/contacts.type"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { Message } from "Renderer/interfaces/message.interface"

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
  primaryPhoneNumber?: string
  secondaryPhoneNumber?: string
  hasTwoNumbers?: boolean
  whichNumber?: string
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
