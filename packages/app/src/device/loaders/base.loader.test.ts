/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseLoader } from "App/device/loaders/base.loader"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const successResponseMock: RequestResponse<any> = {
  status: RequestResponseStatus.Ok,
  data: {},
}

const successResponseWithEmptyBodyMock: RequestResponse = {
  status: RequestResponseStatus.Ok,
}

const failedResponseMock: RequestResponse = {
  status: RequestResponseStatus.Error,
}

const simCardMock: SimCard[] = [
  {
    network: "Network #1",
    networkLevel: 5,
    number: 1,
    slot: 1,
    active: true,
  },
  {
    network: "Network #2",
    networkLevel: 100,
    number: 1,
    slot: 1,
    active: false,
  },
]

class TmpTestClass extends BaseLoader {}

const subject = new TmpTestClass()

describe("Method: isResponsesSuccessWithData", () => {
  test("returns `true` if each response is succeeded", () => {
    expect(
      subject.isResponsesSuccessWithData([
        successResponseMock,
        successResponseMock,
        successResponseMock,
      ])
    ).toBeTruthy()
  })

  test("returns `false` if one of responses is failed", () => {
    expect(
      subject.isResponsesSuccessWithData([
        successResponseMock,
        successResponseMock,
        failedResponseMock,
      ])
    ).toBeFalsy()
  })

  test("returns `false` for success response if one of them haven't data", () => {
    expect(
      subject.isResponsesSuccessWithData([
        successResponseMock,
        successResponseMock,
        successResponseWithEmptyBodyMock,
      ])
    ).toBeFalsy()
  })

  test("returns `false` if each response is failed", () => {
    expect(
      subject.isResponsesSuccessWithData([
        failedResponseMock,
        failedResponseMock,
        failedResponseMock,
      ])
    ).toBeFalsy()
  })
})

describe("Method: getActiveNetworkLevelFromSim", () => {
  test("returns the carrier network level from active sim card", () => {
    expect(subject.getActiveNetworkLevelFromSim(simCardMock)).toEqual("5")
  })

  test("returns `No connection` if sim card list is empty", () => {
    expect(subject.getActiveNetworkLevelFromSim([])).toEqual("No connection")
  })
})

describe("Method: getActiveNetworkFromSim", () => {
  test("returns the carrier network name if sim card data provided", () => {
    expect(subject.getActiveNetworkFromSim(simCardMock)).toEqual("Network #1")
  })

  test("returns `No connection` if sim card list is empty", () => {
    expect(subject.getActiveNetworkFromSim([])).toEqual("No connection")
  })
})
