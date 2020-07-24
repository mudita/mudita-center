import { connect } from "react-redux"
import Backup from "Renderer/modules/settings/tabs/backup/backup.component"
import { RootModel } from "Renderer/models/models"
import { AppSettings } from "App/main/default-app-settings"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  setPureOsBackupLocation: (location: AppSettings["pureOsBackupLocation"]) =>
    dispatch.settings.setPureOsBackupLocation(location),
})

export default connect(mapStateToProps, mapDispatchToProps)(Backup)
