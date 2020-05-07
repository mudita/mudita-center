import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Notifications from "Renderer/modules/settings/tabs/notifications/notifications.component"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadSettings: () => dispatch.settings.loadSettings(),
  setIncomingCalls: (option: Record<Option.IncomingCalls, boolean>) =>
    dispatch.settings.setIncomingCalls(option),
  setIncomingMessages: (option: Record<Option.IncomingMessages, boolean>) =>
    dispatch.settings.setIncomingMessages(option),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
