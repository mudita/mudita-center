/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import axios, { Axios, AxiosResponse } from "axios"
import defaultConfiguration from "App/settings/static/default-app-configuration.json"
import { Configuration } from "App/settings/dto"
import { MuditaCenterServerRoutes } from "App/__deprecated__/api/mudita-center-server/mudita-center-server-routes"

export enum AppConfigurationVersion {
  v1 = "app-configuration",
  v2 = "v2-app-configuration",
}

export interface getNewConfigurationParams {
  version: AppConfigurationVersion
}

export class ConfigurationService {
  private instance: Axios
  private defaultConfiguration: Configuration =
    defaultConfiguration as unknown as Configuration

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.MUDITA_CENTER_SERVER_URL,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
  }

  public async getConfiguration(): Promise<Configuration> {
    try {
      const { data, status } = await this.getNewConfiguration({
        version: AppConfigurationVersion.v2,
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      try {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.defaultConfiguration = require("../app-configuration.json")
      } catch {
        console.error("read app-configuration.json is failed")
      }
    }

    return this.defaultConfiguration
  }

  private async getNewConfiguration(
    params: getNewConfigurationParams
  ): Promise<AxiosResponse<Configuration>> {
    return this.instance.get<Configuration>(
      MuditaCenterServerRoutes.AppConfigurationV2,
      {
        params,
      }
    )
  }
}
