/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { SearchParams, SearchResult } from "App/search/dto"
import { IpcSearchRequest } from "App/search/constants"

export const searchRequest = async (
  data: SearchParams
): Promise<ResultObject<SearchResult>> => {
  return ipcRenderer.callMain(IpcSearchRequest.SearchData, data)
}
