/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Note } from "App/__deprecated__/renderer/modules/tools/tabs/notes.component"
import { SortOrder } from "App/__deprecated__/common/enums/sort-order.enum"

export interface StateProps {
  notes: Note[]
  newNoteId?: string
  sortOrder: SortOrder
}
