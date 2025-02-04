/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import { MuditaCenterServerRoutes } from "shared/utils"
import { Product, SupportedPlatform, OsEnvironment } from "../constants"
import { MscFlashDetails } from "../dto"

const API_BASE_URL = process.env.MUDITA_CENTER_SERVER_V2_URL as string

export class MscFlashDetailsService {
  static async getMscFlashDetails(
    product: Product,
    environment: OsEnvironment,
    platform: SupportedPlatform,
    signal?: AbortSignal
  ): Promise<MscFlashDetails> {
    const response = await axios.get<MscFlashDetails>(
      `${API_BASE_URL}/${MuditaCenterServerRoutes.GetMscFlashDetails}`,
      {
        params: { product, environment, platform },
        signal,
      }
    )

    return response.data as MscFlashDetails
  }
}
