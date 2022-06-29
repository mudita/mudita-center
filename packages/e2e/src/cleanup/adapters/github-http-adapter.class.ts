/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Method, ResponseType } from "axios"
import { Release } from "../types"

export interface GithubHttpAdapterClass {
  getReleaseByTag(tag: string): Promise<Release>
  request<Type>(
    url: string,
    method: Method,
    responseType?: ResponseType
  ): Promise<Type>
}
