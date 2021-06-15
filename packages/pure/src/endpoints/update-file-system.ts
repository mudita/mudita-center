/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, RequestPayload } from "../device"

export interface UploadUpdateFileSystemRequestPayload extends RequestPayload {
  endpoint: Endpoint.UploadUpdateFileSystem
  method: Method.Post
  filePath: string
}
