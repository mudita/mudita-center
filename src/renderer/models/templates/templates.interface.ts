import { Template } from "Renderer/modules/messages/tabs/templates.component"

export interface StateProps {
  templatesList?: Template[]
  searchValue: string
  newTemplateId?: string
}
