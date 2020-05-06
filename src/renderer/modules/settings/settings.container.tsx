import { connect } from "react-redux"
import Settings from "Renderer/modules/settings/settings.component"
import { RootModel } from "Renderer/models/models"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadSettings: () => dispatch.settings.loadSettings(),
  setAutostart: (option: Record<string, boolean>) =>
    dispatch.settings.setAutostart(option),
  setTethering: (option: Record<string, boolean>) =>
    dispatch.settings.setTethering(option),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
