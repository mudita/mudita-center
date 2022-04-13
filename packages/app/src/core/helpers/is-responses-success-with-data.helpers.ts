/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  RequestResponse,
  RequestResponseStatus,
  SuccessRequestResponse,
} from "App/core/types/request-response.interface"

export const isResponseSuccessWithData = <DataType>(
  response: RequestResponse<DataType>
): response is SuccessRequestResponse<DataType> => {
  const { status, data } = response
  return status === RequestResponseStatus.Ok && data !== undefined
}

export const isResponsesSuccessWithData = (
  responses: RequestResponse<any>[]
): responses is SuccessRequestResponse<any>[] => {
  return responses.every(isResponseSuccessWithData)
}
