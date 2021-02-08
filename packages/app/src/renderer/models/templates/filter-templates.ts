import { Template } from "Renderer/modules/messages/tabs/templates.component"
import { removeNewLinesFromString } from "Renderer/utils/remove-new-lines-from-string"

const prepareStringForSearch = (text: string) => {
  return removeNewLinesFromString(text).toLocaleLowerCase()
}

export const filterTemplates = (templates: Template[], searchValue: string) => {
  if (searchValue) {
    return templates.filter((template) => {
      return prepareStringForSearch(template.content).includes(
        prepareStringForSearch(searchValue)
      )
    })
  }
  return templates
}
