/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import MockDate from "mockdate"
import { sendDiagnosticData } from "./send-diagnostic-data.action"
import logger from "App/__deprecated__/main/utils/logger"

const dayBeforeDateMock = "2021-07-05T11:50:35.157Z"
const todayDateMock = "2021-08-05T11:50:35.157Z"

MockDate.set(new Date(todayDateMock))

const setDiagnosticTimestampMock = jest.fn()

jest.mock("App/__deprecated__/main/utils/logger", () => ({
  error: jest.fn(),
  info: jest.fn(),
}))
jest.mock("App/settings/actions/set-diagnostic-timestamp.action", () => ({
  setDiagnosticTimestamp: () => setDiagnosticTimestampMock,
}))

afterAll(() => {
  MockDate.reset()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe("When `serialNumber` is equal to `undefined`", () => {
  test("calls `logger.error` with error message and skip `setDiagnosticTimestamp`", async () => {
    const mockStore = createMockStore([thunk])({
      settings: {
        collectingData: undefined,
        diagnosticSentTimestamp: undefined,
      },
      device: {
        data: {
          serialNumber: undefined,
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(sendDiagnosticData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendDiagnosticData.pending(requestId),
      sendDiagnosticData.fulfilled(undefined, requestId, undefined),
    ])
    expect(logger.error).toHaveBeenCalledWith(
      "Send Diagnostic Data: device logs fail. SerialNumber is undefined."
    )
    expect(setDiagnosticTimestampMock).not.toHaveBeenCalled()
  })
})

describe("When user disallow sending diagnostic data", () => {
  test("calls `logger.info` with info message and skip `setDiagnosticTimestamp`", async () => {
    const mockStore = createMockStore([thunk])({
      settings: {
        collectingData: false,
        diagnosticSentTimestamp: undefined,
      },
      device: {
        data: {
          serialNumber: "0000000000",
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(sendDiagnosticData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendDiagnosticData.pending(requestId),
      sendDiagnosticData.fulfilled(undefined, requestId, undefined),
    ])
    expect(logger.info).toHaveBeenCalledWith(
      "Send Diagnostic Data: user no allowed sent data"
    )
    expect(setDiagnosticTimestampMock).not.toHaveBeenCalled()
  })
})

describe("When diagnostic data has been sended today", () => {
  test("calls `logger.info` with info message and skip `setDiagnosticTimestamp`", async () => {
    const mockStore = createMockStore([thunk])({
      settings: {
        collectingData: true,
        diagnosticSentTimestamp: todayDateMock,
      },
      device: {
        data: {
          serialNumber: "0000000000",
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(sendDiagnosticData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendDiagnosticData.pending(requestId),
      sendDiagnosticData.fulfilled(undefined, requestId, undefined),
    ])
    expect(logger.info).toHaveBeenCalledWith(
      `Send Diagnostic Data: data was sent at ${todayDateMock}`
    )
    expect(setDiagnosticTimestampMock).not.toHaveBeenCalled()
  })
})

describe("When diagnostic data has been sended day before", () => {
  test("calls `logger.info` with info message and set `diagnosticSentTimestamp` via `setDiagnosticTimestamp`", async () => {
    const mockStore = createMockStore([thunk])({
      settings: {
        collectingData: true,
        diagnosticSentTimestamp: dayBeforeDateMock,
      },
      device: {
        data: {
          serialNumber: "0000000000",
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(sendDiagnosticData() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      sendDiagnosticData.pending(requestId),
      sendDiagnosticData.fulfilled(undefined, requestId, undefined),
    ])
    expect(logger.info).toHaveBeenCalledWith(
      `Send Diagnostic Data: skipped until the diagnostic data and storage system will be refined`
    )
    expect(setDiagnosticTimestampMock).toHaveBeenCalled()
  })
})
