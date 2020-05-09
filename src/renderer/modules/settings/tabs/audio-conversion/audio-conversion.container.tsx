import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import AudioConversion from "Renderer/modules/settings/tabs/audio-conversion/audio-conversion.component"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadSettings: () => dispatch.settings.loadSettings(),
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioConversion)
