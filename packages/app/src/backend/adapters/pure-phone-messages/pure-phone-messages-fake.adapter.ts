/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import PurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import { Thread } from "App/messages/store/messages.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { messagesSeed } from "App/seeds/messages"

class PurePhoneMessagesFake extends PurePhoneMessagesAdapter {
  public async getThreads(): Promise<DeviceResponse<Thread[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: messagesSeed.threads,
    }
  }
}

const createFakePurePhoneMessages = (): PurePhoneMessagesAdapter =>
  new PurePhoneMessagesFake()

export default createFakePurePhoneMessages
