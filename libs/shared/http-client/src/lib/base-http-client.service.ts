/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import { Axios, AxiosResponse } from "axios"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BaseHttpAxiosResponse<T = any, D = any>
  extends AxiosResponse<T, D> {}

export abstract class BaseHttpClientService extends Axios {
  constructor() {
    super({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
  }
}
