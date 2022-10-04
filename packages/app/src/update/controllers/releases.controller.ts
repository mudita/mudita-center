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
import { Release } from "App/update/dto"
import { ReleaseService } from "App/update/services"

@Controller(ReleaseControllerPrefix)
export class ReleasesController {
  constructor(private releaseService: ReleaseService) {}

  @IpcEvent(IpcReleaseEvent.GetAllReleases)
  public async getAllReleases(
    product: Product
  ): Promise<ResultObject<Release[] | undefined>> {
    return flags.get(Feature.DeveloperModeEnabled)
      ? this.releaseService.getAllReleases(product)
      : Result.success([])
  }

  @IpcEvent(IpcReleaseEvent.GetLatestRelease)
  public async getLatestRelease(
    product: Product
  ): Promise<ResultObject<Release | undefined>> {
    return this.releaseService.getLatestRelease(product)
  }
}
