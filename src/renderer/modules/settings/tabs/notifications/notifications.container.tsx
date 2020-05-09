import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import Notifications from "Renderer/modules/settings/tabs/notifications/notifications.component"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadSettings: () => dispatch.settings.loadSettings(),
  setIncomingCalls: (option: boolean) =>
    dispatch.settings.setIncomingCalls(option),
  setIncomingMessages: (option: boolean) =>
    dispatch.settings.setIncomingMessages(option),
  setLowBattery: (option: boolean) => dispatch.settings.setLowBattery(option),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
