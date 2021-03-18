/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SortOrder } from "Common/enums/sort-order.enum"

export interface Template {
  date: Date
  content: string
  id: string
}

export interface StateProps {
  templates?: Template[]
  searchValue: string
  newTemplateId?: string
  sortOrder: SortOrder
}
