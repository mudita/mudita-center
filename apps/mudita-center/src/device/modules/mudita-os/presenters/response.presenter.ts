/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { Response } from "App/device/types/mudita-os"
import { ResponseStatus } from "App/device/constants"

enum BlockReason {
  EulaNotAccepted = "2",
  BatteryCriticalLevel = "3",
}

type BodyType = {
  category?: string
  phoneLockTime?: number
  timeLeftToNextAttempt?: number
  phoneLockCode?: number[]
  reason?: BlockReason
}

export class ResponsePresenter {
  static toResponseObject(
    response: ResultObject<Response<BodyType>>
  ): RequestResponse {
    const { status, body: data, error } = response.data as Response<BodyType>

    if (
      status === ResponseStatus.Ok ||
      status === ResponseStatus.Accepted ||
      status === ResponseStatus.Redirect
    ) {
      return {
        data,
        status: RequestResponseStatus.Ok,
      }
    } else if (status === ResponseStatus.NoContent) {
      return {
        status: RequestResponseStatus.Ok,
      }
    } else if (status === ResponseStatus.PhoneLocked) {
      return {
        error,
        status: RequestResponseStatus.PhoneLocked,
      }
    } else if (status === ResponseStatus.InternalServerError) {
      return {
        error,
        status: RequestResponseStatus.InternalServerError,
      }
    } else if (status === ResponseStatus.Conflict) {
      return {
        data,
        error,
        status: RequestResponseStatus.Duplicated,
      }
    } else if (status === ResponseStatus.UnprocessableEntity) {
      return {
        error,
        status: RequestResponseStatus.UnprocessableEntity,
      }
    } else if (
      status === ResponseStatus.NotAccepted &&
      (data === undefined || data?.reason === BlockReason.EulaNotAccepted)
    ) {
      return {
        error,
        status: RequestResponseStatus.OnboardingNotFinished,
      }
    } else if (
      status === ResponseStatus.NotAccepted &&
      data?.reason === BlockReason.BatteryCriticalLevel
    ) {
      return {
        error,
        status: RequestResponseStatus.BatteryCriticalLevel,
      }
    } else if (status === ResponseStatus.InsufficientStorage) {
      return {
        error,
        status: RequestResponseStatus.InsufficientStorage,
      }
    } else {
      return {
        error,
        status: RequestResponseStatus.Error,
      }
    }
  }
}
