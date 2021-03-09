/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import { Thread } from "App/messages/store/messages.interface"

export default abstract class PurePhoneMessagesAdapter {
  public abstract getThreads(): Promise<DeviceResponse<Thread[]>>
}
