/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { selectDeviceEntities } from "../selectors/entities"

export const cancelLoadEntities = createAsyncThunk<
  void,
  { deviceId: string },
  { state: ReduxRootState }
>(ActionName.CancelLoadEntities, async ({ deviceId }, { getState }) => {
  const entities = selectDeviceEntities(getState(), { deviceId })

  for (const entitiesType in entities) {
    const abortController = entities[entitiesType]?.abortController
    if (abortController) {
      abortController.abort()
    }
  }
})
