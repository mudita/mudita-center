/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortResponse } from "app-serialport/models"

export const withBodyStatus = (res: SerialPortResponse) => {
  const body =
    typeof res.body === "object" && res.body !== null
      ? { ...(res.body as Record<string, unknown>), _status: res.status }
      : { _status: res.status }

  return {
    ...res,
    body,
  } as const
}
