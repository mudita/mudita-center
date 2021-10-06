/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"


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
    isResponsesSuccessWithData([
      successResponseMock,
      successResponseMock,
      successResponseMock,
    ])
  ).toBeTruthy()
})

test("returns `false` if one of responses is failed", () => {
  expect(
    isResponsesSuccessWithData([
      successResponseMock,
      successResponseMock,
      failedResponseMock,
    ])
  ).toBeFalsy()
})

test("returns `false` for success response if one of them haven't data", () => {
  expect(
    isResponsesSuccessWithData([
      successResponseMock,
      successResponseMock,
      successResponseWithEmptyBodyMock,
    ])
  ).toBeFalsy()
})

test("returns `false` if each response is failed", () => {
  expect(
    isResponsesSuccessWithData([
      failedResponseMock,
      failedResponseMock,
      failedResponseMock,
    ])
  ).toBeFalsy()
})
