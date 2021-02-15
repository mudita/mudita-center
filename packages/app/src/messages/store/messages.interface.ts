import { Caller } from "Renderer/models/calls/calls.interface"

export enum VisibilityFilter {
  All = "all",
  Unread = "unread",
}

export type Author = Pick<Caller, "id">

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

export type MessagesState = Readonly<{
  topics: Topic[]
  searchValue: string
  visibilityFilter?: VisibilityFilter
}>
