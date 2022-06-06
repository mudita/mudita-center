/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/dto"

export interface TemplateFormProps {
  onClose: () => void
  onSave: (template: Pick<Template, "text">) => void
  savingPossible: boolean
  saving: boolean
  template?: Template
  error?: Error | string | null
}
