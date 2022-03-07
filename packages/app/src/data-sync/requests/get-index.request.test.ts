/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDataSyncRequest, DataIndex } from "App/data-sync/constants"
import { getIndexRequest } from "App/data-sync/requests"
import { SerialisedIndexData } from "elasticlunr"

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
    ;(ipcRenderer as any).__rendererCalls = {
      [IpcDataSyncRequest.GetIndex]: getIndexResponse,
    }
    const response = await getIndexRequest(DataIndex.Contact)
    expect(response).toEqual(getIndexResponse)
  })
})
