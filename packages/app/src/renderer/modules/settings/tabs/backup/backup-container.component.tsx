/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { connect } from "react-redux"
import Backup from "Renderer/modules/settings/tabs/backup/backup.component"
import { RootModel } from "Renderer/models/models"
import { AppSettings } from "App/main/store/settings.interface"

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
