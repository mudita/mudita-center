import { ChangeEvent } from "react"
import { Caller } from "Renderer/models/calls/calls.interface"

export interface Author extends Pick<Caller, "id"> {
  phoneNumber?: string
}

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
  caller: Caller
  unread: boolean
  messages: Message[]
}

export enum VisibilityFilter {
  All = "all",
  Unread = "unread",
}

export type MessagesState = Readonly<{
  topics: Topic[]
  searchValue: string
  visibilityFilter?: VisibilityFilter
}>

export type ComponentProps = Omit<MessagesState, "topics"> &
  Readonly<{
    changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
    changeVisibilityFilter?: (filter: VisibilityFilter) => void
    deleteConversation?: (ids: string[]) => void
    list: Topic[]
    visibilityFilter?: VisibilityFilter
    markAsRead?: (ids: string[]) => void
    toggleReadStatus?: (ids: string[]) => void
  }>
