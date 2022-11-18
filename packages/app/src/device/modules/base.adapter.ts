/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import { RequestConfig, Response } from "App/device/types/mudita-os"
import { DeviceCommunicationEvent } from "App/device/constants"

export abstract class BaseAdapter {
  constructor(public path: string) {}

  public abstract disconnect(): Promise<ResultObject<boolean>>
  public abstract request(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: RequestConfig<any>
  ): // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<ResultObject<Response<any>>>
  public abstract on(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void
  public abstract off(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void
}
