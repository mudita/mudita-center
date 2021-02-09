/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneNetworkAdapter {
  public abstract getSimCards(): Promise<DeviceResponse<SimCard[]>>
  public abstract setActiveCard(): DeviceResponse
}
