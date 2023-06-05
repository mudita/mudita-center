/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { Feature, flags } from "App/feature-flags"
import { ResultObject, Result } from "App/core/builder"
import {
  ReleaseControllerPrefix,
  IpcReleaseEvent,
  Product,
} from "App/update/constants"
import { GetReleasesByVersionsInput, OsRelease } from "App/update/dto"
import { ReleaseService } from "App/update/services"

@Controller(ReleaseControllerPrefix)
export class ReleasesController {
  constructor(private releaseService: ReleaseService) {}

  @IpcEvent(IpcReleaseEvent.GetAllReleases)
  public async getAllReleases({
    product,
    deviceSerialNumber,
  }: {
    product: Product
    deviceSerialNumber?: string
  }): Promise<ResultObject<OsRelease[] | undefined>> {
    // TODO [mw] workaround change needed for QA team. Should be removed when implementing CP-1743
    return flags.get(Feature.DeveloperModeEnabled)
      ? this.releaseService.getTestReleasesForSOSUfeature(
          product,
          deviceSerialNumber
        )
      : Result.success([])
  }

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
