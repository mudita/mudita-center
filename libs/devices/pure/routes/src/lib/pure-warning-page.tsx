/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useAppNavigate } from "app-routing/utils"
import { useRoutingHistory } from "app-routing/feature"
import {
  useActiveDevice,
  useDeviceConfig,
  useDevices,
} from "devices/common/feature"
import { DevicesPaths } from "devices/common/models"
import { Modal, Typography } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Pure } from "devices/pure/models"
import { isPureBatteryFlat } from "devices/pure/feature"

const messages = defineMessages({
  batteryFlatTitle: {
    id: "pure.batteryFlatModal.title",
  },
  batteryFlatDescription: {
    id: "pure.batteryFlatModal.description",
  },
  batterFlatStatus: {
    id: "pure.batteryFlatModal.description2",
  },
})

interface Props {
  device: Pure
}

export const PureWarningPage: FunctionComponent<Props> = ({ device }) => {
  const queryClient = useQueryClient()
  const navigate = useAppNavigate()
  const { getPreviousPath } = useRoutingHistory()
  const { data: devices = [] } = useDevices()
  const { data: config } = useDeviceConfig(device, { refetchInterval: 5000 })

  const batteryLevel = config?.batteryLevel

  const onModalClose = useCallback(() => {
    const previousPath = getPreviousPath((path) => {
      return (
        !path.startsWith(DevicesPaths.Index) && !path.startsWith("/device/")
      )
    })
    if (devices.length > 1) {
      queryClient.removeQueries({ queryKey: useActiveDevice.queryKey })
    }
    navigate({ pathname: previousPath })
  }, [devices.length, getPreviousPath, navigate, queryClient])

  return (
    <Modal opened>
      <Modal.CloseButton onClick={onModalClose} />
      {batteryLevel && isPureBatteryFlat(batteryLevel) && (
        <BatteryFlat batteryLevel={batteryLevel} />
      )}
    </Modal>
  )
}

const BatteryFlat: FunctionComponent<{ batteryLevel: number }> = ({
  batteryLevel,
}) => {
  return (
    <>
      <Modal.TitleIcon type={IconType.BatteryFlat} />
      <Modal.Title>{formatMessage(messages.batteryFlatTitle)}</Modal.Title>
      <Typography.P1 message={messages.batteryFlatDescription.id} />
      <Typography.P1
        message={messages.batterFlatStatus.id}
        values={{ batteryLevel }}
      />
    </>
  )
}
