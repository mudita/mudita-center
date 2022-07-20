/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface TemplateOptionsProps {
  templateId: string
  onDelete: (templateIds: string[]) => void
  onUpdate: (templateId: string) => void
}
