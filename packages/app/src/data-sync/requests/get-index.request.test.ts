/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDataSyncRequest, DataIndex } from "App/data-sync/constants"
import { getIndexRequest } from "App/data-sync/requests"
import { SerialisedIndexData } from "elasticlunr"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getIndexResponse: SerialisedIndexData<any> = {
  fields: [],
  index: {},
  pipeline: [],
  ref: "",
  version: "",
  documentStore: { docInfo: {}, docs: {} },
}

describe("`getIndexRequest`", () => {
  test("return properly value", async () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    ;(ipcRenderer as any).__rendererCalls = {
      [IpcDataSyncRequest.GetIndex]: getIndexResponse,
    }
    const response = await getIndexRequest(DataIndex.Contact)
    expect(response).toEqual(getIndexResponse)
  })
})
