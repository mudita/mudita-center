/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "Core/device/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setExternalUsageDevice } from "Core/device/actions/base.action"
import { externalUsageDevice } from "Core/device/requests/external-usage-device.request"
import { setExternalUsageDeviceRequest } from "Core/analytic-data-tracker/requests/set-external-usage-device.request"
import { settingsStateSelector } from "Core/settings/selectors"
import { getActiveDeviceBaseDataSelector } from "Core/device-manager/selectors/get-active-device-base-data.selector"
import { trackOsVersion } from "Core/analytic-data-tracker/helpers"
import { MetadataKey, setValue } from "Core/metadata"

export const processDeviceDataOnLoad = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(DeviceEvent.ProcessDeviceDataOnLoad, async (_, { getState, dispatch }) => {
  const settingsState = settingsStateSelector(getState())
  const deviceData = getActiveDeviceBaseDataSelector(getState())

  if (deviceData === undefined) {
    return
  }

  void trackOsVersion({
    serialNumber: deviceData.serialNumber,
    osVersion: deviceData.data.osVersion,
    deviceType: deviceData.deviceType,
  })
  void setValue({
    key: MetadataKey.DeviceOsVersion,
    value: deviceData.data.osVersion ?? null,
  })
  void setValue({
    key: MetadataKey.DeviceType,
    value: deviceData.deviceType,
  })

  if (deviceData.externalUsageDevice === null) {
    const resultExternalUsageDevice = settingsState.privacyPolicyAccepted
      ? await externalUsageDevice(deviceData.serialNumber ?? "")
      : false

    await setExternalUsageDeviceRequest(resultExternalUsageDevice)
    if (settingsState.privacyPolicyAccepted !== undefined) {
      dispatch(setExternalUsageDevice(resultExternalUsageDevice))
    }
  }
})
