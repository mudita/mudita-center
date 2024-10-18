/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MscFlashDetails } from "../dto"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "generic-view/store"
import { OsEnvironment, SupportedPlatform, Product } from "../constants"
import { MscFlashDetailsService } from "../services/msc-flash-details.service"

export const getMscFlashingFilesDetails = createAsyncThunk<
  MscFlashDetails,
  {
    product: Product
    environment: OsEnvironment
    platform: SupportedPlatform
    signal?: AbortSignal
  },
  { state: ReduxRootState }
>(
  ActionName.MscFlashingGetFilesDetails,
  async ({ product, environment, platform, signal }, { rejectWithValue }) => {
    try {
      const filesDetails = await MscFlashDetailsService.getMscFlashDetails(
        product,
        environment,
        platform,
        signal
      )

      return filesDetails
    } catch (error) {
      return rejectWithValue(error || "Failed to fetch flashing files")
    }
  }
)
