/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { Template, NewTemplate } from "App/templates/dto"
import { TemplateDeletingState } from "App/templates/constants"

export interface TemplatesProps {
  templates: Template[]
  loading: boolean
  error: Error | string | null
  deletingState: TemplateDeletingState | null
  createTemplate: (arg: NewTemplate) => Promise<PayloadAction<any>>
  deleteTemplates: (arg: string[]) => Promise<PayloadAction<any>>
  hideDeleteModal: () => void
}
