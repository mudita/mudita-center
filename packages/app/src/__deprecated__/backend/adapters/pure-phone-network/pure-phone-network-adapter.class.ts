/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import { RequestResponse } from "App/core/types/request-response.interface"

export default abstract class PurePhoneNetworkAdapter {
  public abstract getSimCards(): Promise<RequestResponse<SimCard[]>>
  public abstract setActiveCard(): RequestResponse
}
