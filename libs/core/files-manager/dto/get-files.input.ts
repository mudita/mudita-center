/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceDirectory } from "Core/files-manager/constants"
import { DeviceFileFilter } from "Core/files-manager/dto/device-file-filter.interface"

export interface GetFilesInput {
  directory: DeviceDirectory
  filter?: DeviceFileFilter
}
