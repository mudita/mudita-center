/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Notes, { Note } from "Renderer/modules/tools/tabs/notes.component"
import { Dispatch, select } from "Renderer/store"
import { NoteCallback } from "Renderer/models/notes/notes"
import { SortOrder } from "Common/enums/sort-order.enum"

const selector = select(({ notes }) => ({
  notes: notes.sortedNotes,
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
  onRemoveNotes: (ids: string[]) => dispatch.notes.removeNotes(ids),
})

export default connect(mapStateToProps, mapDispatchToProps as Dispatch)(Notes)
