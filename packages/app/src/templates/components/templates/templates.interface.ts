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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createTemplate: (arg: NewTemplate) => Promise<PayloadAction<any>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteTemplates: (arg: string[]) => Promise<PayloadAction<any>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTemplate: (arg: Template) => Promise<PayloadAction<any>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTemplateOrder: (arg: Template[]) => Promise<PayloadAction<any>>
}

export interface TemplateServiceState {
  creating: boolean
  creatingInfo: boolean
  updating: boolean
  updatingInfo: boolean
  deleting: boolean
  deletingConfirmation: boolean
  deletingInfo: boolean
  updatingOrder: boolean
  updatingOrderInfo: boolean
}
