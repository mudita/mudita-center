/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { Backup } from "App/settings/components/backup/backup.component"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { setOsBackupLocation } from "App/settings/actions"

const mapStateToProps = (state: ReduxRootState) => ({
  osBackupLocation: state.settings.osBackupLocation,
})

const mapDispatchToProps = {
  setOsBackupLocation,
}

export const BackupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Backup)
