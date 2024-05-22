/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type ResponseErrorCode = number

export interface ResponseError {
  code?: ResponseErrorCode
  message: string
}
