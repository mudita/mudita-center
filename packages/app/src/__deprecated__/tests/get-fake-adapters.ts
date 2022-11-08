/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createFakePurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-fake.adapter"
import createFakeDeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-fake.adapter"

const getFakeAdapters = (): Adapters => ({
  deviceFileSystem: createFakeDeviceFileSystemAdapter(),
  purePhone: createFakePurePhoneAdapter(),
})

export default getFakeAdapters
