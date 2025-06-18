/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Pure, PureErrorType } from "devices/pure/models"
import { useQuery } from "@tanstack/react-query"
import { getPureLockStatus } from "../api/get-pure-lock-status"

const queryFn = async (device?: Pure) => {
  if (!device) {
    return false
  }
  const response = await getPureLockStatus(device)
  if (response.status === 204) {
    return false
  } else if (response.status === PureErrorType.DeviceLocked) {
    return true
  } else {
    throw response.status
  }
}

export const usePureLockedInfo = (device?: Pure) => {
  return useQuery<boolean, PureErrorType>({
    queryKey: ["device", device?.path, "pure-locked-info"],
    queryFn: () => queryFn(device),
    enabled: !!device,
    refetchInterval: 2000,
    retry: 3,
    retryDelay: 500,
  })
}