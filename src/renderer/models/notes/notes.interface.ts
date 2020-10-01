import { Note } from "Renderer/modules/tools/tabs/notes.component"

export interface StateProps {
  notesList: Note[]
  newNoteId?: string
  sortDescending: boolean
}
