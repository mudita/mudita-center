/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"

export default interface Adapters {
  deviceFileSystem: DeviceFileSystemAdapter
  purePhone: PurePhoneAdapter
}
