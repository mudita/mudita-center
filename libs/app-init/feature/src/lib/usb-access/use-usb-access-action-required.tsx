/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import logger from "electron-log/renderer"
import { useUsbAccessStatus } from "./use-usb-access-status"
import { RequirementStatus } from "../requirement-status.type"

export const useUsbAccessActionRequired = () => {
  const [usbAccessActionRequired, setUsbAccessActionRequired] =
    useState<RequirementStatus>(RequirementStatus.Unknown)

  const { isLoading, isError, hasAccess, restartRequired } =
    useUsbAccessStatus()

  useEffect(() => {
    if (isLoading) {
      setUsbAccessActionRequired(RequirementStatus.Unknown)
      return
    }

    if (isError) {
      logger.warn("USB access check failed: cannot verify permissions")
      setUsbAccessActionRequired(RequirementStatus.ActionNotRequired)
      return
    }

    if (!hasAccess || restartRequired) {
      setUsbAccessActionRequired(RequirementStatus.ActionRequired)
    } else {
      setUsbAccessActionRequired(RequirementStatus.ActionNotRequired)
    }
  }, [isLoading, isError, hasAccess, restartRequired])

  return usbAccessActionRequired
}
