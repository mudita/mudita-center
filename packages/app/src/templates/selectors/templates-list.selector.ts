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
    return a.order - b.order
  })
}

export const templatesListSelector = createSelector(
  templatesSelector,
  (templates) => {
    const sortedTemplates = sortTemplates(templates)

    return sortedTemplates
  }
)
