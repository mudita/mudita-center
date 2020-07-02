import { Contact } from "Renderer/models/phone/phone.interface"

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
  "firstName" | "lastName" | "primaryPhoneNumber"
>

export interface Call {
  id: string
  caller: Caller
  duration: number
  date: Date
  timesMissed: number
  status: CallStatus
}

export interface StateProps {
  calls?: Call[]
  visibilityFilter?: VisibilityFilter
}
