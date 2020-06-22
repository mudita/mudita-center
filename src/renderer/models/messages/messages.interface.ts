import { ChangeEvent } from "react"
import { Contact } from "Renderer/models/phone/phone.interface"

export interface Caller {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  inContacts: boolean
}

type UnknownContact = Pick<
  Contact,
  | "id"
  | "firstName"
  | "lastName"
  | "primaryPhoneNumber"
  | "secondaryPhoneNumber"
>

export type Author = Contact | UnknownContact

export interface Content {
  id: string
  text: string
}

export interface Message {
  id: string
  date: string
  content: string
  interlocutor?: boolean
  author: Author
}

export interface Topic {
  id: string
  caller: Author
  unread: boolean
  messages: Message[]
}

export enum VisibilityFilter {
  All = "all",
  Unread = "unread",
}

export type StateProps = Readonly<{
  topics?: Topic[]
  searchValue: string
  visibilityFilter?: VisibilityFilter
}>

export type ComponentProps = StateProps &
  Readonly<{
    changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
    changeVisibilityFilter?: (filter: VisibilityFilter) => void
    list: Topic[]
  }>
