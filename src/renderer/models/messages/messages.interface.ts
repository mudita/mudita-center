import { ChangeEvent } from "react"
import { Contact } from "Renderer/models/phone/phone.typings"

export type Author = Pick<
  Contact,
  "id" | "firstName" | "lastName" | "primaryPhoneNumber"
>

export interface Content {
  id: string
  text: string
}

export interface Message {
  id: string
  date: Date
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
  topics: Topic[]
  searchValue: string
  visibilityFilter?: VisibilityFilter
}>

export type ComponentProps = Omit<StateProps, "topics"> &
  Readonly<{
    changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
    changeVisibilityFilter?: (filter: VisibilityFilter) => void
    deleteConversation?: (ids: string[]) => void
    list: Topic[]
    visibilityFilter?: VisibilityFilter
  }>
