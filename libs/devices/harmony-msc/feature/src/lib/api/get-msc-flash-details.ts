/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MscFlashDetails } from "devices/harmony-msc/models"
import { AppResult, OsEnvironment, platform } from "app-utils/models"
import { AppHttp } from "app-utils/renderer"

export interface GetMscFlashDetailsParams extends Record<string, unknown> {
  product: "MscHarmony"
  environment: OsEnvironment
}

export const getMscFlashDetails = async (
  params: GetMscFlashDetailsParams,
  signal?: AbortSignal
): Promise<AppResult<MscFlashDetails>> => {
  return AppHttp.request<MscFlashDetails>({
    signal,
    params: {
      ...params,
      platform,
    },
    url: `${import.meta.env.VITE_MUDITA_CENTER_SERVER_URL}/msc-flash/`,
    method: "GET",
  })
}
