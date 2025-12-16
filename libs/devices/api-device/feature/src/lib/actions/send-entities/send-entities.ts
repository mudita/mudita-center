/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  sendEntitiesAsData,
  SendEntitiesAsDataParams,
} from "./send-entities-as-data"
import {
  sendEntitiesAsFile,
  SendEntitiesAsFileParams,
} from "./send-entities-as-file"

type FileModeParams = {
  mode: "file"
} & SendEntitiesAsFileParams

type DataModeParams = {
  mode: "data"
} & SendEntitiesAsDataParams

type Params = FileModeParams | DataModeParams

export const sendEntities = async (params: Params) => {
  if (params.mode === "data") {
    const { mode, ...dataModeParams } = params
    return await sendEntitiesAsData(dataModeParams)
  }
  if (params.mode === "file") {
    const { mode, ...fileModeParams } = params
    return await sendEntitiesAsFile(fileModeParams)
  }
}
