/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useAppNavigate } from "app-routing/utils"
import { useRoutingHistory } from "app-routing/feature"
import { useActiveDevice, useDevices } from "devices/common/feature"
import { DevicesPaths } from "devices/common/models"
import { Modal, Typography } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "pure.passcodeModal.title",
  },
  description: {
    id: "pure.passcodeModal.description",
  },
})

export const PureLockedPage: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const navigate = useAppNavigate()
  const { getPreviousPath } = useRoutingHistory()
  const { data: devices = [] } = useDevices()

  const onModalClose = useCallback(() => {
    const previousPath = getPreviousPath((path) => {
      return (
        !path.startsWith(DevicesPaths.Index) && !path.startsWith("/device/")
      )
    })
    if (devices.length > 1) {
      queryClient.removeQueries({ queryKey: useActiveDevice.queryKey })
      navigate({ pathname: DevicesPaths.Selecting })
    } else {
      navigate({ pathname: previousPath })
    }
  }, [devices.length, getPreviousPath, navigate, queryClient])

  return (
    <Modal opened>
      <Modal.CloseButton onClick={onModalClose} />
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Typography.P1>{formatMessage(messages.description)}</Typography.P1>
    </Modal>
  )
}
