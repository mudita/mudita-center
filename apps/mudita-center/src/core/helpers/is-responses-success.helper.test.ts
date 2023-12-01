/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isResponsesSuccess } from "App/core/helpers/is-responses-success.helper"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const successResponseMock: RequestResponse<any> = {
  status: RequestResponseStatus.Ok,
}

const successResponseWithEmptyErrorMock: RequestResponse = {
  status: RequestResponseStatus.Ok,
  error: undefined,
}

const failedResponseWithStatusMock: RequestResponse = {
  status: RequestResponseStatus.Error,
}

const failedResponseMock: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "Luke, I'm your error",
  },
}

test("returns `true` if each response is succeeded", () => {
  expect(
    isResponsesSuccess([
      successResponseMock,
      successResponseMock,
      successResponseMock,
    ])
  ).toBeTruthy()
})

test("returns `true` if each response is succeeded with empty error", () => {
  expect(
    isResponsesSuccess([
      successResponseMock,
      successResponseMock,
      successResponseWithEmptyErrorMock,
    ])
  ).toBeTruthy()
})

test("returns `false` if one of responses is failed with error", () => {
  expect(
    isResponsesSuccess([
      successResponseMock,
      successResponseMock,
      failedResponseMock,
    ])
  ).toBeFalsy()
})

test("returns `false` if one of responses is failed status", () => {
  expect(
    isResponsesSuccess([
      successResponseMock,
      successResponseMock,
      failedResponseWithStatusMock,
    ])
  ).toBeFalsy()
})

test("returns `false` if each response is failed", () => {
  expect(
    isResponsesSuccess([
      failedResponseMock,
      failedResponseMock,
      failedResponseMock,
    ])
  ).toBeFalsy()
})
