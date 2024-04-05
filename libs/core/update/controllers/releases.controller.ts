/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { IpcReleaseEvent, Product } from "Core/update/constants"
import { GetReleasesByVersionsInput, OsRelease } from "Core/update/dto"
import { ReleaseService } from "Core/update/services"

export class ReleasesController {
  constructor(private releaseService: ReleaseService) {}

  @IpcEvent(IpcReleaseEvent.GetLatestRelease)
  public async getLatestRelease({
    product,
    deviceSerialNumber,
  }: {
    product: Product
    deviceSerialNumber?: string
  }): Promise<ResultObject<OsRelease | undefined>> {
    return this.releaseService.getLatestRelease(product, deviceSerialNumber)
  }

  @IpcEvent(IpcReleaseEvent.GetReleasesByVersions)
  public async getReleasesByVersions(
    params: GetReleasesByVersionsInput
  ): Promise<ResultObject<OsRelease[]>> {
    return this.releaseService.getReleasesByVersions(params)
  }
}
