/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  RequestResponse,
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"

export const isResponseSuccess = <DataType>(
  response: RequestResponse<DataType>
): response is SuccessRequestResponse<DataType> => {
  const { status, error } = response
  return status === RequestResponseStatus.Ok && !error
}

export const isResponsesSuccess = (
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responses: RequestResponse<any>[]
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): responses is SuccessRequestResponse<any>[] => {
  return responses.every(isResponseSuccess)
}
