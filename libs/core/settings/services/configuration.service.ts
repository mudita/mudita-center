/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  BaseHttpAxiosResponse,
  BaseHttpClientService,
} from "shared/http-client"
import defaultConfiguration from "Core/settings/static/default-app-configuration.json"
import { Configuration } from "Core/settings/dto"
import { MuditaCenterServerRoutes } from "Core/__deprecated__/api/mudita-center-server/mudita-center-server-routes"

export enum AppConfigurationVersion {
  v1 = "app-configuration",
  v2 = "v2-app-configuration",
}

export interface getNewConfigurationParams {
  version: AppConfigurationVersion
}

export class ConfigurationService {
  private baseURL = process.env.MUDITA_CENTER_SERVER_URL ?? ""
  private defaultConfiguration: Configuration =
    defaultConfiguration as unknown as Configuration

  constructor(private httpClientService: BaseHttpClientService) {}

  public async getConfiguration(): Promise<Configuration> {
    try {
      const { data, status } = await this.getNewConfiguration({
        version: AppConfigurationVersion.v2,
      })
      if (status === 200) {
        return data
      } else {
        this.rewriteDefaultConfiguration()
      }
    } catch {
      this.rewriteDefaultConfiguration()
    }

    return this.defaultConfiguration
  }

  private async getNewConfiguration(
    params: getNewConfigurationParams
  ): Promise<BaseHttpAxiosResponse<Configuration>> {
    return this.httpClientService.get<Configuration>(
      `${this.baseURL}/${MuditaCenterServerRoutes.AppConfigurationV2}`,
      {
        params,
      }
    )
  }

  private rewriteDefaultConfiguration() {
    try {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.defaultConfiguration = require("../static/app-configuration.json")
    } catch {
      console.error("read app-configuration.json is failed")
    }
  }
}
