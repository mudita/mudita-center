import { Note } from "Renderer/modules/tools/tabs/notes.component"
import { SortOrder } from "Common/enums/sort-order.enum"

export interface StateProps {
  notes: Note[]
  newNoteId?: string
  sortOrder: SortOrder
}
