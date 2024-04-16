/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useDispatch } from "react-redux"
import { PayloadAction } from "@reduxjs/toolkit"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import BackupUI from "Core/settings/components/backup/backup-ui.component"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import { getPaths } from "shared/app-state"
import { ResultObject } from "Core/core/builder"

export interface BackupProps {
  setOsBackupLocation: (value: string) => void
  osBackupLocation: string
}

export const Backup: FunctionComponent<BackupProps> = ({
  setOsBackupLocation,
  osBackupLocation,
}) => {
  const dispatch = useDispatch<TmpDispatch>()

  const openDialog = async () => {
    const { payload: getPathsPayload } = (await dispatch(
      getPaths({
        properties: ["openDirectory"],
        defaultPath: osBackupLocation,
      })
    )) as PayloadAction<ResultObject<string[] | undefined>>
    const location = getPathsPayload.ok && (getPathsPayload.data as string[])[0]

    if (location) {
      setOsBackupLocation(location)
    }
  }

  return <BackupUI backupLocation={osBackupLocation} openDialog={openDialog} />
}
