import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Notes from "Renderer/modules/tools/tabs/notes-ui.component"

const mapStateToProps = (state: RootModel) => {
  return state.notes
}

export default connect(mapStateToProps, null)(Notes)
