/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createFakePurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-fake.adapter"

const getFakeAdapters = (): Adapters => ({
  purePhone: createFakePurePhoneAdapter(),
})

export default getFakeAdapters
