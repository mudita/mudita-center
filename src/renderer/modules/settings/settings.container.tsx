import { connect } from "react-redux"
import Settings from "Renderer/modules/settings/settings.component"
import { RootModel } from "Renderer/models/models"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadSettings: () => dispatch.settings.loadSettings(),
  setAutostart: (option: Record<string, ToggleState>) =>
    dispatch.settings.setAutostart(option),
  setTethering: (option: Record<string, ToggleState>) =>
    dispatch.settings.setTethering(option),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
