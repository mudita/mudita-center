import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import AudioConversion from "Renderer/modules/settings/tabs/audio-conversion/audio-conversion.component"
import { Convert } from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadSettings: () => dispatch.settings.loadSettings(),
  setNonStandardAudioFilesConversion: (option: boolean) =>
    dispatch.settings.setNonStandardAudioFilesConversion(option),
  setConvert: (option: Convert) => dispatch.settings.setConvert(option),
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioConversion)
