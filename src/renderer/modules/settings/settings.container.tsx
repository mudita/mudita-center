import { connect } from "react-redux"
import Settings from "Renderer/modules/settings/settings.component"
import { RootModel } from "Renderer/models/models"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadSettings: () => dispatch.settings.loadSettings(),
  setAutostart: (option: Record<Option.Autostart, boolean>) =>
    dispatch.settings.setAutostart(option),
  setTethering: (option: Record<Option.Tethering, boolean>) =>
    dispatch.settings.setTethering(option),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
