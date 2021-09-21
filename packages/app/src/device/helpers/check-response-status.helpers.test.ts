/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { checkResponseStatus } from "./check-response-status.helpers"

const successResponseMock: DeviceResponse<any> = {
  status: DeviceResponseStatus.Ok,
  data: {},
}

const successResponseWithEmptyBodyMock: DeviceResponse = {
  status: DeviceResponseStatus.Ok,
}

const failedResponseMock: DeviceResponse = {
  status: DeviceResponseStatus.Error,
}

test("returns `true` if each response is succeeded", () => {
  expect(
    checkResponseStatus([
      successResponseMock,
      successResponseMock,
      successResponseMock,
    ])
  ).toBeTruthy()
})

test("returns `false` if one of responses is failed", () => {
  expect(
    checkResponseStatus([
      successResponseMock,
      successResponseMock,
      failedResponseMock,
    ])
  ).toBeFalsy()
})

test("returns `false` for success response if one of them haven't data", () => {
  expect(
    checkResponseStatus([
      successResponseMock,
      successResponseMock,
      successResponseWithEmptyBodyMock,
    ])
  ).toBeFalsy()
})

test("returns `false` if each response is failed", () => {
  expect(
    checkResponseStatus([
      failedResponseMock,
      failedResponseMock,
      failedResponseMock,
    ])
  ).toBeFalsy()
})
