/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/store/templates.interface"
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
