/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum E2eMockIpcEvents {
  shutdownServer = "e2eMock:shutdownServer",
  setAppUpdaterState = "e2eMock:setAppUpdaterState",
  emitAppUpdaterDownloadProgressEvent = "e2eMock:emitAppUpdaterDownloadProgressEvent",
  setUsbAccess = "e2eMock:setUsbAccess",
  mockAppHttpResponse = "e2eMock:mockAppHttpResponse",
}
