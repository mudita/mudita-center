/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { usbAccessQueryKeys } from "./usb-access-query-keys"

export const useHasSerialPortAccessOnce = () =>
  useQuery({
    queryKey: usbAccessQueryKeys.hasSerialPortAccess(),
    queryFn: () => window.api.usbAccess.hasSerialPortAccess(),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
