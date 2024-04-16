/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { updateSettings } from "Core/settings/requests"

const registerFirstPhoneConnection = (): void => {
  void updateSettings({ key: "neverConnected", value: false })
}

export default registerFirstPhoneConnection
