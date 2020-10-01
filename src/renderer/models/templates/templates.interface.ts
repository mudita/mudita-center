import { Template } from "Renderer/modules/messages/tabs/templates.component"

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

export interface StateProps {
  templates?: Template[]
  searchValue: string
  sortOrder: SortOrder
}
