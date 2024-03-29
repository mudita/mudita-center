/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createClient } from "Core/__deprecated__/api/mudita-center-server"
import { AppError } from "Core/core/errors"
import { ResultObject, Result } from "Core/core/builder"
import {
  GetReleasesByVersionsInput,
  OsRelease,
  ReleaseManifest,
} from "Core/update/dto"
import {
  Product,
  OsEnvironment,
  UpdateErrorServiceErrors,
} from "Core/update/constants"
import { GithubReleasePresenter } from "Core/update/presenters"
import { RELEASE_SPACE } from "Core/update/constants/release-space.constant"

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
