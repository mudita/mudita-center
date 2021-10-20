/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import RequestResponse, {
  RequestResponseStatus,
} from "App/main/functions/request-response.interface"

interface SuccessRequestResponse<DataType = undefined>
  extends RequestResponse<DataType> {
  status: RequestResponseStatus.Ok
  data: DataType
}

export const isResponsesSuccessWithData = (
  responses: RequestResponse<any>[]
): responses is SuccessRequestResponse<any>[] => {
  return responses.every(
    ({ status, data }) =>
      status === RequestResponseStatus.Ok && data !== undefined
  )
}
