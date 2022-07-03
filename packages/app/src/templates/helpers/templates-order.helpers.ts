/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/dto"
import { PayloadAction } from "@reduxjs/toolkit"

export const reorder = (
  list: Template[],
  startIndex: number,
  endIndex: number,
  updateTemplateOrder: (arg: Template[]) => Promise<PayloadAction<any>>
): Template[] => {
  const movedTemplates = list.filter((_template, index) => {
    if (startIndex < endIndex) {
      return startIndex <= index && index <= endIndex
    } else {
      return endIndex <= index && index <= startIndex
    }
  })
  const orderStartValue = startIndex < endIndex ? startIndex : endIndex
  const indexToOrderValue = 1
  const updatedTemplates: Template[] = movedTemplates.map((template, index) => {
    return {
      ...template,
      order: orderStartValue + indexToOrderValue + index,
    }
  })
  updateTemplateOrder(updatedTemplates)
  return updatedTemplates
}
