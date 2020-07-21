import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Notes from "Renderer/modules/tools/tabs/notes-ui.component"
import { Dispatch } from "Renderer/store"

const mapStateToProps = (state: RootModel) => {
  return state.notes
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createNewNote: (note: any) => dispatch.notes.createNewNote(note),
})

export default connect(mapStateToProps, mapDispatchToProps as Dispatch)(Notes)
