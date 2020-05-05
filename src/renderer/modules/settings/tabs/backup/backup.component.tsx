import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { AppSettings } from "App/main/default-app-settings"
import BackupUI from "Renderer/modules/settings/tabs/backup/backup-ui.component"
import { RootModel } from "Renderer/models/models"
import { SimCard } from "Renderer/models/basic-info/interfaces"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import { connect } from "react-redux"

// const mapStateToProps = (state: RootModel) => {
//   return {
//     ...state.basicInfo,
//     ...selection(state, null),
//     ...state.phoneUpdate,
//   }
// }

const mapDispatchToProps = (dispatch: any) => ({
  openDialog: () => dispatch.backupSettings.openDialog(),
})

// const Backup: FunctionComponent = () => {

//   const [settings, setSettings] = useState<AppSettings>()
//   useEffect(() => {
//     ;(async () => {
//       setSettings(await getAppSettings())
//     })()
//   }, [settings])
//   return <BackupUI backupLocation={settings?.pureOsBackupLocation} />
// }

export default connect(null, mapDispatchToProps)(BackupUI)
