/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/dto"
import { DropResult } from "react-beautiful-dnd"

export interface TemplatesListProps {
  templates: Template[]
  deleteTemplates: (ids: string[]) => void
  updateTemplate: (id: string) => void
  onDragEnd: (result: DropResult) => void
  toggleRow: (id: string) => void
  templateFormOpen: boolean
  selectedItems: string[]
  active?: Template
}
