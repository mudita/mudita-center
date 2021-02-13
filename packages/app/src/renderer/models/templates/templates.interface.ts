import { Template } from "Renderer/modules/messages/tabs/templates.component"
import { SortOrder } from "Common/enums/sort-order.enum"

export interface StateProps {
  templates?: Template[]
  searchValue: string
  newTemplateId?: string
  sortOrder: SortOrder
}
