import { ChangeEvent } from "react"

export interface Caller {
  id: string
  forename: string
  surname: string
  phone: string
  avatar?: string
}

export interface Message {
  id: string
  date: string
  content: string
  isCaller: boolean
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
  Read = "read",
}

export type StateProps = Readonly<{
  topics: Topic[]
  searchValue: string
  visibilityFilter: VisibilityFilter
}>

export type ComponentProps = StateProps &
  Readonly<{
    handleSearchValue: (event: ChangeEvent<HTMLInputElement>) => void
    handleVisibilityFilter: (event: ChangeEvent<HTMLSelectElement>) => void
    list: Topic[]
  }>
