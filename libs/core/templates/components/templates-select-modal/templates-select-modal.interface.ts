/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "Core/templates/dto"

export interface TemplatesSelectModalProps {
  open: boolean
  onClose: () => void
  onSelect: (template: Template) => void
  templates: Template[]
}
