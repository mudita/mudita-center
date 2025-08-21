/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useAppNavigate } from "app-routing/utils"
import { useRoutingHistory } from "app-routing/feature"
import {
  useActiveDeviceQuery,
  useDeviceConfigQuery,
  useDevicesQuery,
} from "devices/common/feature"
import { DevicesPaths } from "devices/common/models"
import { Modal, Typography } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Pure, PureErrorType } from "devices/pure/models"

const messages = defineMessages({
  batteryFlatTitle: {
    id: "pure.batteryFlatModal.title",
  },
  batteryFlatDescription: {
    id: "pure.batteryFlatModal.description",
  },
  onboardingNotFinishedTitle: {
    id: "pure.onboardingNotFinishedModal.title",
  },
  onboardingNotFinishedDescription: {
    id: "pure.onboardingNotFinishedModal.description",
  },
})

interface Props {
  device: Pure
}

export const PureWarningPage: FunctionComponent<Props> = ({ device }) => {
  const queryClient = useQueryClient()
  const navigate = useAppNavigate()
  const { getPreviousPath } = useRoutingHistory()
  const { data: devices = [] } = useDevicesQuery()
  const { failureReason } = useDeviceConfigQuery(device)

  const onModalClose = useCallback(() => {
    const previousPath = getPreviousPath((path) => {
      return (
        !path.startsWith(DevicesPaths.Index) && !path.startsWith("/device/")
      )
    })
    if (devices.length > 1) {
      queryClient.removeQueries({ queryKey: useActiveDeviceQuery.queryKey })
      navigate({ pathname: DevicesPaths.Selecting })
    } else {
      navigate({ pathname: previousPath })
    }
  }, [devices.length, getPreviousPath, navigate, queryClient])

  return (
    <Modal opened>
      <Modal.CloseButton onClick={onModalClose} />
      {failureReason === PureErrorType.EulaNotAccepted ? (
        <OnboardingNotFinished />
      ) : (
        failureReason === PureErrorType.BatteryFlat && <BatteryFlat />
      )}
    </Modal>
  )
}

const BatteryFlat: FunctionComponent = () => {
  return (
    <>
      <Modal.TitleIcon type={IconType.BatteryFlat} />
      <Modal.Title>{formatMessage(messages.batteryFlatTitle)}</Modal.Title>
      <Typography.P1 message={messages.batteryFlatDescription.id} />
    </>
  )
}

const OnboardingNotFinished: FunctionComponent = () => {
  return (
    <>
      <Modal.TitleIcon type={IconType.Error} />
      <Modal.Title>
        {formatMessage(messages.onboardingNotFinishedTitle)}
      </Modal.Title>
      <Typography.P1 message={messages.onboardingNotFinishedDescription.id} />
    </>
  )
}
