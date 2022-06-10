/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { Template, NewTemplate } from "App/templates/dto"

export interface TemplatesProps {
  templates: Template[]
  loading: boolean
  loaded: boolean
  error: Error | string | null
  deleting: boolean
  createTemplate: (arg: NewTemplate) => Promise<PayloadAction<any>>
  deleteTemplates: (arg: string[]) => Promise<PayloadAction<any>>
  hideDeleteModal: () => void
}
