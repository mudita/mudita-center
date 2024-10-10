/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import { MuditaCenterServerRoutes } from "Core/__deprecated__/api/mudita-center-server/mudita-center-server-routes"
import { Product, SupportedPlatform, OsEnvironment } from "../constants"
import { MscFlashDetails } from "../dto"

const API_BASE_URL = process.env.MUDITA_CENTER_SERVER_URL as string

export class MscFlashDetailsService {
  static async getMscFlashDetails(
    product: Product,
    environment: OsEnvironment,
    platform: SupportedPlatform
  ): Promise<MscFlashDetails> {
    const response = await axios.get<MscFlashDetails>(
      `${API_BASE_URL}/${MuditaCenterServerRoutes.GetMscFlashDetails}`,
      {
        params: { product, environment, platform },
      }
    )

    return response.data as MscFlashDetails
  }
}
