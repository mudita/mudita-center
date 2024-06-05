/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import {
  selectDataMigrationStatus,
  setDataMigrationStatus,
} from "generic-view/store"
import theme from "Core/core/styles/theming/theme"
import { DefaultTheme, ThemeProvider } from "styled-components"
import { PurePasscode } from "./pure-passcode"

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
    dispatch(setDataMigrationStatus("idle"))
  }

  if (deviceId && dataMigrationStatus === "pure-password-required") {
    return (
      <ThemeProvider theme={theme as unknown as DefaultTheme}>
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
