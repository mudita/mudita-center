/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type SerialPortRequest<R = Record<string, unknown>> = R & {
  options?: {
    timeout?: number
    retries?: number
  }
}
export type SerialPortResponse<R = Record<string, unknown>> = {
  status: number
  endpoint: string | number
} & R
