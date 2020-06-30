import { Template } from "Renderer/modules/messages/tabs/templates-ui.component"
import { removeNewLinesFromString } from "Renderer/utils/remove-new-lines-from-string"

export const filterTemplates = (templates: Template[], searchValue: string) => {
  if (searchValue.length > 0) {
    return templates.filter(template => {
      return removeNewLinesFromString(template.text)
        .toLocaleLowerCase()
        .includes(removeNewLinesFromString(searchValue).toLocaleLowerCase())
    })
  }
  return templates
}
