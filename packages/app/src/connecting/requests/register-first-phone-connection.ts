/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { updateAppSettings } from "Renderer/requests/app-settings.request"

const registerFirstPhoneConnection = (): void => {
  void updateAppSettings({ key: "pureNeverConnected", value: false })
}

export default registerFirstPhoneConnection
