/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Backup from "Renderer/modules/settings/tabs/backup/backup.component"
import { RootModel } from "Renderer/models/models"
import { TmpDispatch } from "Renderer/store"
import { AppSettings } from "App/main/store/settings.interface"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

// TODO replace `TmpDispatch` with legit `Dispatch`
const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  setPureOsBackupLocation: (location: AppSettings["pureOsBackupLocation"]) =>
    dispatch.settings.setPureOsBackupLocation(location),
})

export default connect(mapStateToProps, mapDispatchToProps)(Backup)
