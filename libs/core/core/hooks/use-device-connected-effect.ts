/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { answerMain } from "shared/utils"
import {
  deactivateDevice,
  getDevicesSelector,
  isActiveApiDeviceLockedSelector,
} from "device-manager/feature"
import {
  setActiveDevice,
  activeDeviceIdSelector,
} from "active-device-registry/feature"
import { getDeviceConfigurationRequest } from "core-device/feature"
import {
  DeviceProtocolMainEvent,
  DeviceType,
  DeviceBaseProperties,
} from "device-protocol/models"
import { selectDialogOpenState } from "shared/app-state"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isActiveDeviceProcessingSelector } from "Core/device/selectors/is-active-device-processing.selector"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
} from "Core/__deprecated__/renderer/constants/urls"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"
import { getTmpMuditaHarmonyPortInfoSelector } from "Core/update/selectors/get-tmp-mudita-harmony-port-info-selector"
import { isUnknownSerialNumber } from "Core/device/constants/unknown-serial-number.constant"
import { getDiscoveryStatus } from "Core/discovery-device/selectors/get-discovery-status.selector"
import { checkIsAnyModalPresent } from "Core/utils/check-is-any-other-modal-present"

export const useDeviceConnectedEffect = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const activeApiDeviceLocked = useSelector((state: ReduxRootState) =>
    activeDeviceId
      ? isActiveApiDeviceLockedSelector(state, activeDeviceId)
      : false
  )

  const shouldDiscoverySkipOnConnect = useDiscoverySkipOnConnect()
  const continueProcess = useContinueProcess()

  useEffect(() => {
    const handler = async (properties: DeviceBaseProperties) => {
      if (activeApiDeviceLocked) {
        await dispatch(deactivateDevice())
        dispatch(setDiscoveryStatus(DiscoveryStatus.Aborted))
      }

      if (activeDeviceId) {
        await continueProcess(properties)
        return
      }

      if (!shouldDiscoverySkipOnConnect()) {
        history.push(URL_DISCOVERY_DEVICE.root)
      }
    }

    return answerMain<DeviceBaseProperties>(
      DeviceProtocolMainEvent.DeviceConnected,
      handler
    )
  }, [
    history,
    dispatch,
    activeDeviceId,
    continueProcess,
    shouldDiscoverySkipOnConnect,
    activeApiDeviceLocked,
  ])
}

const useDiscoverySkipOnConnect = () => {
  const history = useHistory()
  const devices = useSelector(getDevicesSelector)
  const discoveryStatus = useSelector(getDiscoveryStatus)
  const initializationDeviceInProgress = useSelector(
    isInitializationDeviceInProgress
  )
  const initializationAppInProgress = useSelector(isInitializationAppInProgress)
  const dialogOpen = useSelector(selectDialogOpenState)

  return useCallback(() => {
    const skipOnSettings =
      history.location.pathname.includes(URL_MAIN.settings) &&
      checkIsAnyModalPresent()
    const skipIfAborted =
      discoveryStatus === DiscoveryStatus.Aborted && devices.length !== 0

    return (
      skipIfAborted ||
      discoveryStatus === DiscoveryStatus.Discovering ||
      initializationDeviceInProgress ||
      initializationAppInProgress ||
      skipOnSettings ||
      dialogOpen
    )
  }, [
    history,
    devices,
    discoveryStatus,
    initializationDeviceInProgress,
    initializationAppInProgress,
    dialogOpen,
  ])
}

const useNavigateToInitialization = () => {
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

  return useCallback(
    async (deviceId: string) => {
      await dispatch(setActiveDevice(deviceId))
      dispatch(setDiscoveryStatus(DiscoveryStatus.Discovered))
      history.push(URL_DEVICE_INITIALIZATION.root)
    },
    [dispatch, history]
  )
}

/**
 * Workaround for restarting Mudita Harmony device during the update process,
 * when the serial number is "00000000000000". Applicable to Mudita Harmony versions
 * below 1.8.2, addressing the described issue.
 */

const useContinueProcessViaWorkaround = () => {
  const activeDeviceProcessing = useSelector(isActiveDeviceProcessingSelector)
  const tmpMuditaHarmonyPortInfo = useSelector(
    getTmpMuditaHarmonyPortInfoSelector
  )
  const navigateToInitialization = useNavigateToInitialization()

  return useCallback(
    async (properties: DeviceBaseProperties) => {
      if (!activeDeviceProcessing) {
        return
      }

      if (properties.deviceType !== DeviceType.MuditaHarmony) {
        return
      }

      if (tmpMuditaHarmonyPortInfo === undefined) {
        return
      }

      const { locationId, serialNumber } = tmpMuditaHarmonyPortInfo
      // Windows & Mac workaround
      if (locationId !== undefined) {
        if (properties.locationId === locationId) {
          await navigateToInitialization(properties.id)
        }

        return
      }

      // Linux (without handle multi)
      if (isUnknownSerialNumber(serialNumber)) {
        await navigateToInitialization(properties.id)
      }

      const result = await getDeviceConfigurationRequest(properties.id)

      if (result.ok && result.data.serialNumber === serialNumber) {
        await navigateToInitialization(properties.id)
      }
    },
    [activeDeviceProcessing, navigateToInitialization, tmpMuditaHarmonyPortInfo]
  )
}

const useContinueProcess = () => {
  const navigateToInitialization = useNavigateToInitialization()
  const continueProcessViaWorkaround = useContinueProcessViaWorkaround()
  const activeDeviceId = useSelector(activeDeviceIdSelector)

  return useCallback(
    async (properties: DeviceBaseProperties) => {
      if (activeDeviceId === properties.id) {
        await navigateToInitialization(properties.id)
        return
      }

      await continueProcessViaWorkaround(properties)
    },
    [activeDeviceId, navigateToInitialization, continueProcessViaWorkaround]
  )
}
