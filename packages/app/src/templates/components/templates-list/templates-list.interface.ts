/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/dto"

export interface TemplatesListProps {
  deleteTemplates: (ids: string[]) => void
  updateTemplate: (id: string) => void
  templateReordered: () => void
  templateFormOpen: boolean
  selectedTemplateIds: string[]
  activeTemplate?: Template
}
