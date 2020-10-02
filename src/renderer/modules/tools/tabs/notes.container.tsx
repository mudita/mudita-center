import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Notes, { Note } from "Renderer/modules/tools/tabs/notes.component"
import { Dispatch, select } from "Renderer/store"
import { NoteCallback } from "Renderer/models/notes/notes"
import { SortOrder } from "Common/enums/sort-order.enum"

const selector = select(({ notes }) => ({
  notesList: notes.sortedList,
}))

const mapStateToProps = (state: RootModel) => ({
  ...state.notes,
  ...selector(state, {}),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeSortOrder: (sortOrder: SortOrder) =>
    dispatch.notes.changeSortOrder(sortOrder),
  createNewNote: (note: NoteCallback) => dispatch.notes.createNewNote(note),
  saveNote: (note: Note) => dispatch.notes.saveNote(note),
  removeNotes: (ids: string[]) => dispatch.notes.removeNotes(ids),
})

export default connect(mapStateToProps, mapDispatchToProps as Dispatch)(Notes)
