/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"
import { AppHttpRequestConfig, AppHttpResult } from "app-utils/models"

export const AppHttp = {
  request: <Data>({
    onDownloadProgress,
    ...config
  }: Omit<AppHttpRequestConfig, "rid">): Promise<AppHttpResult<Data>> & {
    abort: VoidFunction
  } => {
    const rid = crypto.randomUUID()
    let unregister: VoidFunction | undefined

    if (onDownloadProgress) {
      unregister = window.api.appHttp.onDownloadProgress(
        rid,
        onDownloadProgress
      )
    }

    const promise = window.api.appHttp.request<Data>({ ...config, rid })

    promise.finally(() => {
      unregister?.()
    })

    const abort = () => {
      window.api.appHttp.abort(rid)
    }

    return Object.assign(promise, { abort })
  },
}
