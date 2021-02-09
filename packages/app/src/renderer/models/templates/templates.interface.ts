/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Template } from "Renderer/modules/messages/tabs/templates.component"
import { SortOrder } from "Common/enums/sort-order.enum"

export interface StateProps {
  templates?: Template[]
  searchValue: string
  newTemplateId?: string
  sortOrder: SortOrder
}
