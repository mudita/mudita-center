/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { Template } from "App/templates/dto"

export interface TemplatesPanelProps {
  onAddNewTemplate: () => void
  disabled: boolean
  toggleAll?: UseTableSelect<Template>["toggleAll"]
  onDeleteClick: () => void
  selectedTemplates: Template[]
  allItemsSelected?: boolean
}
