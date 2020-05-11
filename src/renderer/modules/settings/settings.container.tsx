import { connect } from "react-redux"
import Settings from "Renderer/modules/settings/settings.component"
import { RootModel } from "Renderer/models/models"

const mapStateToProps = (state: RootModel) => {
  return state.settings
}

const mapDispatchToProps = (dispatch: any) => dispatch.settings

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
