import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Notifications from "Renderer/modules/settings/tabs/notifications/notifications.component"

const mapStateToProps = (state: RootModel) => {
  return state.settings
}

const mapDispatchToProps = (dispatch: any) => dispatch.settings

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
