import { Contact } from "Renderer/models/phone/phone.typings"
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

export type Caller = Pick<
  Contact,
  "id" | "firstName" | "lastName" | "primaryPhoneNumber"
>

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
