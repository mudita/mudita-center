/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createClient } from "App/__deprecated__/api/mudita-center-server"
import { AppError } from "App/core/errors"
import { ResultObject, Result } from "App/core/builder"
import {
  GetReleasesByVersionsInput,
  OsRelease,
  ReleaseManifest,
} from "App/update/dto"
import {
  Product,
  OsEnvironment,
  UpdateErrorServiceErrors,
} from "App/update/constants"
import { GithubReleasePresenter } from "App/update/presenters"
import { RELEASE_SPACE } from "App/update/constants/release-space.constant"

const releaseSpace =
  (process.env.FEATURE_TOGGLE_RELEASE_ENVIRONMENT as OsEnvironment) ||
  OsEnvironment.Production

export class ReleaseService {
  constructor(private client: ReturnType<typeof createClient>) {}

  public async getAllReleases(
    product: Product
  ): Promise<ResultObject<OsRelease[] | undefined>> {
    try {
      const releases = await Promise.all([
        this.getRelease(product, OsEnvironment.Production, "latest"),
        this.getRelease(product, OsEnvironment.TestProduction, "latest"),
        this.getRelease(product, OsEnvironment.Daily, "latest"),
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

  // TODO [mw] workaround change needed for QA team. Should be removed when implementing CP-1743
  public async getTestReleasesForSOSUfeature(
    product: Product,
    deviceSerialNumber?: string
  ): Promise<ResultObject<OsRelease[] | undefined>> {
    try {
      const promises = [
        this.getRelease(
          product,
          OsEnvironment.Production,
          "latest",
          deviceSerialNumber
        ),
        product === Product.BellHybrid
          ? this.getRelease(
              product,
              OsEnvironment.Production,
              "1.6.0",
              deviceSerialNumber
            )
          : undefined,
        this.getRelease(
          product,
          OsEnvironment.TestProduction,
          "latest",
          deviceSerialNumber
        ),
        this.getRelease(
          product,
          OsEnvironment.Daily,
          "latest",
          deviceSerialNumber
        ),
      ].filter((item): item is Promise<ReleaseManifest> => !!item)

      const releases = await Promise.all(promises)

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
    deviceSerialNumber,
  }: GetReleasesByVersionsInput): Promise<ResultObject<OsRelease[]>> {
    try {
      const releases = await Promise.all(
        versions.map((version) =>
          this.getRelease(product, RELEASE_SPACE, version, deviceSerialNumber)
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
    product: Product,
    deviceSerialNumber?: string
  ): Promise<ResultObject<OsRelease | undefined>> {
    try {
      const release = await this.getRelease(
        product,
        RELEASE_SPACE,
        "latest",
        deviceSerialNumber
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
    releaseSpace: OsEnvironment,
    version: "latest" | string,
    deviceSerialNumber?: string
  ): Promise<ReleaseManifest> {
    const { data } = await this.client.getLatestRelease({
      product,
      environment: releaseSpace,
      version,
      deviceSerialNumber,
    })

    return data
  }
}
