/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Backup from "App/__deprecated__/renderer/modules/settings/tabs/backup/backup.component"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { TmpDispatch } from "App/__deprecated__/renderer/store"
import { AppSettings } from "App/__deprecated__/main/store/settings.interface"

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.settings,
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  setPureOsBackupLocation: (location: AppSettings["pureOsBackupLocation"]) =>
    dispatch.settings.setPureOsBackupLocation(location),
})

export default connect(mapStateToProps, mapDispatchToProps)(Backup)
