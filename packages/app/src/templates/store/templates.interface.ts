import { Template } from "App/templates/templates-ui.component"
import { SortOrder } from "Common/enums/sort-order.enum"

export interface StateProps {
  templates?: Template[]
  searchValue: string
  newTemplateId?: string
  sortOrder: SortOrder
}
