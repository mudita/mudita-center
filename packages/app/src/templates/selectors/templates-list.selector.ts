/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Template } from "App/templates/dto"

const templatesSelector = ({ templates }: ReduxRootState) => templates.data

const sortTemplates = (templates: Template[]): Template[] => {
  return [...templates].sort((a, b) => {
    const orderA = a.order
    const orderB = b.order
    return orderA && orderB ? orderA - orderB : -1
  })
}

export const templatesListSelector = createSelector(
  templatesSelector,
  (templates) => {
    const sortedTemplates = sortTemplates(templates)

    return sortedTemplates
  }
)
