/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Provider } from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"

export interface ExternalService {
  type: Provider
}

export interface FileService {
  type: "files"
  data: File[]
}
