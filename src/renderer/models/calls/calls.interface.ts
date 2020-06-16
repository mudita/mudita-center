import { Contact } from "Renderer/models/phone/phone.interface"

export enum VisibilityFilter {
  All = "all",
  Received = "received",
  Missed = "missed",
}

export interface Call {
  id: string
  caller: Pick<Contact, "firstName" | "lastName" | "primaryPhoneNumber">
  duration: number
  date: string
  timesMissed: number
}

export interface StateProps {
  calls?: Call[]
  visibilityFilter?: VisibilityFilter
}
