/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import {
  DataMigrationStatus,
  selectDataMigrationStatus,
  setDataMigrationStatus,
} from "generic-view/store"
import { ThemeProvider } from "styled-components"
import { PurePasscode } from "./pure-passcode"
import { appTheme } from "Root/app-theme"

interface Props {
  deviceId?: DeviceId
  onUnlock: VoidFunction
}

export const PurePasscodeModal: FunctionComponent<Props> = ({
  deviceId,
  onUnlock,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)

  const closePasscodeModal = () => {
    dispatch(setDataMigrationStatus(DataMigrationStatus.Idle))
  }

  if (
    deviceId &&
    dataMigrationStatus === DataMigrationStatus.PurePasswordRequired
  ) {
    return (
      <ThemeProvider theme={appTheme}>
        <PurePasscode
          deviceId={deviceId}
          onClose={closePasscodeModal}
          onUnlock={onUnlock}
        />
      </ThemeProvider>
    )
  }
  return null
}
