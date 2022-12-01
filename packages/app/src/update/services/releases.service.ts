/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createClient } from "App/__deprecated__/api/mudita-center-server"
import { AppError } from "App/core/errors"
import { ResultObject, Result } from "App/core/builder"
import {
  GetReleasesByVersionsInput,
  Release,
  ReleaseManifest,
} from "App/update/dto"
import {
  Product,
  Environment,
  UpdateErrorServiceErrors,
} from "App/update/constants"
import { GithubReleasePresenter } from "App/update/presenters"

export class ReleaseService {
  constructor(private client: ReturnType<typeof createClient>) {}

  public async getAllReleases(
    product: Product
  ): Promise<ResultObject<Release[] | undefined>> {
    try {
      const releases = await Promise.all([
        this.getRelease(product, Environment.Production, "latest"),
        this.getRelease(product, Environment.TestProduction, "latest"),
        this.getRelease(product, Environment.Daily, "latest"),
      ])

      return Result.success(
        releases.map((release) => GithubReleasePresenter.toRelease(release))
      )
    } catch (error) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.GetAllRelease,
          "Fail during retrieving of the release"
        )
      )
    }
  }

  public async getReleasesByVersions({
    product,
    versions,
  }: GetReleasesByVersionsInput): Promise<ResultObject<Release[]>> {
    try {
      const releases = await Promise.all(
        versions.map((version) =>
          this.getRelease(product, Environment.Production, version)
        )
      )

      return Result.success(
        releases.map((release) => GithubReleasePresenter.toRelease(release))
      )
    } catch (error) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.GetReleasesByVersion,
          "Fail during retrieving of the releases"
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
        Environment.Production,
        "latest"
      )

      return Result.success(GithubReleasePresenter.toRelease(release))
    } catch (error) {
      return Result.failed(
        new AppError(
          UpdateErrorServiceErrors.GetAllRelease,
          "Fail during retrieving of the release"
        )
      )
    }
  }

  private async getRelease(
    product: Product,
    releaseSpace: Environment,
    version: "latest" | string
  ): Promise<ReleaseManifest> {
    const { data } = await this.client.getLatestRelease({
      product,
      environment: releaseSpace,
      version,
    })

    return data
  }
}
