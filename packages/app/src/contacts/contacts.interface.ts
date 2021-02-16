/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export interface ExternalService {
  type: Provider
}

export interface FileService {
  type: "files"
  data: File[]
}
