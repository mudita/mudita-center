import { Template } from "Renderer/modules/messages/tabs/templates-ui.component"

export const filterTemplates = (templates: Template[], searchValue: string) => {
  if (searchValue.length > 0) {
    return templates.filter(template => {
      return template.text
        .toLocaleLowerCase()
        .trim()
        .includes(searchValue.toLocaleLowerCase().trim())
    })
  }
  return templates
}
