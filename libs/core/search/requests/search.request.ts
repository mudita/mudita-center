/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { SearchParams, SearchResult } from "Core/search/dto"
import { IpcSearchEvent } from "Core/search/constants"

export const searchRequest = async (
  data: SearchParams
): Promise<ResultObject<SearchResult | undefined>> => {
  return ipcRenderer.callMain(IpcSearchEvent.SearchData, data)
}
