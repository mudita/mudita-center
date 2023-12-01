/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/dto"

export const reorder = (list: Template[]): Template[] => {
  return list.map((template, index) => {
    return { ...template, order: list.length - index }
  })
}
