/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createClient } from "App/__deprecated__/api/mudita-center-server"
import { AppError } from "App/core/errors"
import { ResultObject, Result } from "App/core/builder"
import { Release, ReleaseManifest } from "App/update/dto"
import { Product, ReleaseSpace, UpdateError } from "App/update/constants"
import { GithubReleasePresenter } from "App/update/presenters"

export class ReleaseService {
  constructor(private client: ReturnType<typeof createClient>) {}

  public async getAllReleases(
    product: Product
  ): Promise<ResultObject<Release[] | undefined>> {
    try {
      const releases = await Promise.all([
        this.getRelease(product, ReleaseSpace.ProductionReleases),
        this.getRelease(product, ReleaseSpace.PreReleases),
        this.getRelease(product, ReleaseSpace.DailyReleases),
      ])

      return Result.success(
        releases.map((release) => GithubReleasePresenter.toRelease(release))
      )
    } catch (error) {
      return Result.failed(
        new AppError(
          UpdateError.GetAllRelease,
          "Fail during retrieving of the release"
        )
      )
    }
  }

  public async getLatestRelease(
    product: Product
  ): Promise<ResultObject<Release | undefined>> {
    try {
      const release = await this.getRelease(
        product,
        ReleaseSpace.ProductionReleases
      )

      return Result.success(GithubReleasePresenter.toRelease(release))
    } catch (error) {
      return Result.failed(
        new AppError(
          UpdateError.GetAllRelease,
          "Fail during retrieving of the release"
        )
      )
    }
  }

  private async getRelease(
    product: Product,
    releaseSpace: ReleaseSpace
  ): Promise<ReleaseManifest> {
    const { data } = await this.client.getLatestRelease({
      product,
      releaseSpace,
    })

    return data
  }
}
