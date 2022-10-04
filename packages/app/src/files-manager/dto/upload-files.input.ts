/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceDirectory } from "App/files-manager/constants"

export interface UploadFilesInput {
  directory: DeviceDirectory
  filePaths: string[]
}
