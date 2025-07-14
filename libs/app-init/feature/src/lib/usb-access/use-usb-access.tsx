/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation, useQuery } from "@tanstack/react-query"
import { usbAccessQueryKeys } from "./usb-access-query-keys"
import { delayUntilAtLeast } from "app-utils/common"

export const useHasSerialPortAccess = () =>
  useQuery({
    queryKey: usbAccessQueryKeys.hasSerialPortAccess(),
    queryFn: () => window.api.usbAccess.hasSerialPortAccess(),
  })

export const useGrantAccessToSerialPort = () => {
  return useMutation({
    mutationFn: () =>
      delayUntilAtLeast(window.api.usbAccess.grantAccessToSerialPort, 500),
  })
}
