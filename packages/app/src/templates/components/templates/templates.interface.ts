/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template, NewTemplate } from "App/templates/dto"

export interface TemplatesProps {
  templates: Template[]
  loading: boolean
  error: Error | string | null
  createTemplate: (template: NewTemplate) => Template
}
