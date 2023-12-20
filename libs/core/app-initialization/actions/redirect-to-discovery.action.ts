/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isActiveDeviceSet } from "Core/device-manager/selectors/is-active-device-set.selector"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress.selector"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { AppInitializationEvent } from "Core/app-initialization/constants/event.constant"
import { isDeviceListEmpty } from "Core/device-manager/selectors/is-device-list-empty.selector"

export const redirectToDiscovery = createAsyncThunk<
  void,
  History,
  { state: ReduxRootState }
>(
  AppInitializationEvent.RedirectToDiscovery,
  async (history, { dispatch, getState }) => {
    console.log("application initialized: redirect to discovery Action!", )

    const deviceListEmpty = isDeviceListEmpty(getState())

    if (deviceListEmpty) {
      console.log(
        "application initialized: redirect to discovery skipped because device list is empty: "
      )
      return
    }

    const activeDeviceSet = isActiveDeviceSet(getState())

    if (activeDeviceSet) {
      console.log("application initialized: redirect to discovery skipped because active device is set")
      // TODO: add switch logic when device is active
      // handle backup/update/restore process when is in progress
      return
    }

    // TODO: handle discovery in progress
    const discoveryDeviceInProgress = isDiscoveryDeviceInProgress(getState())

    if (discoveryDeviceInProgress) {
      console.log("application initialized: redirect to discovery skipped because discovery device is in progress: ")
      return
    }

    // TODO: handle device initialization
    const initializationDeviceInProgress = isInitializationDeviceInProgress(
      getState()
    )

    if (initializationDeviceInProgress) {
      console.log("application initialized: redirect to discovery skipped because initialization device is in progress: ")
      return
    }

    history.push(URL_DISCOVERY_DEVICE.root)
  }
)
