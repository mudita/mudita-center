/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import axios, { Axios, AxiosResponse } from "axios"
import defaultConfiguration from "App/settings/static/default-app-configuration.json"
import { Configuration } from "App/settings/dto"

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
      const { data, status } = await this.getNewConfiguration()
      if (status === 200) {
        return data
      }
    } catch (error) {
      try {
        this.defaultConfiguration = require("../app-configuration.json")
      } catch {
        console.error("read app-configuration.json is failed")
      }
    }

    return this.defaultConfiguration
  }

  private async getNewConfiguration(): Promise<AxiosResponse<Configuration>> {
    return this.instance.get<Configuration>("v2-app-configuration")
  }
}
