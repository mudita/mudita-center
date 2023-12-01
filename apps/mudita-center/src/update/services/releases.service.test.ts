/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createClient } from "App/__deprecated__/api/mudita-center-server"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { ReleaseService } from "App/update/services/releases.service"
import { OsRelease, ReleaseManifest } from "App/update/dto"
import {
  Product,
  OsReleaseType,
  UpdateErrorServiceErrors,
} from "App/update/constants"

let executionCount = 0
const clientMock = {
  getRelease: jest.fn(),
} as unknown as ReturnType<typeof createClient>

const subject = new ReleaseService(clientMock)

const productionReleaseManifest: ReleaseManifest = {
  version: "1.2.3",
  date: "Thu, 04 Aug 2022 09:57:33 GMT",
  product: Product.PurePhone,
  file: {
    url: "https://muditacenterosreleaseweb-muditaoslatestreleases07-fomskribsxjs.s3.eu-central-1.amazonaws.com/latest/PurePhone/PurePhone-1.3.0-RT1051-Update.tar",
    size: "156928000",
    name: "PurePhone-1.3.0-RT1051-Update.tar",
  },
  mandatoryVersions: ["1.2.2"],
}

const candidateReleaseManifest: ReleaseManifest = {
  version: "1.2.3-rc.1",
  date: "Thu, 04 Aug 2022 09:57:33 GMT",
  product: Product.PurePhone,
  file: {
    url: "https://muditacenterosreleaseweb-muditaoslatestreleases07-fomskribsxjs.s3.eu-central-1.amazonaws.com/latest/PurePhone/PurePhone-1.3.0-RT1051-Update.tar",
    size: "156928000",
    name: "PurePhone-1.3.0-RT1051-Update.tar",
  },
  mandatoryVersions: [""],
}

const dailyReleaseManifest: ReleaseManifest = {
  version: "1.2.3-daily.2022.08.12",
  date: "Thu, 04 Aug 2022 09:57:33 GMT",
  product: Product.PurePhone,
  file: {
    url: "https://muditacenterosreleaseweb-muditaoslatestreleases07-fomskribsxjs.s3.eu-central-1.amazonaws.com/latest/PurePhone/PurePhone-1.3.0-RT1051-Update.tar",
    size: "156928000",
    name: "PurePhone-1.3.0-RT1051-Update.tar",
  },
  mandatoryVersions: [""],
}

const mapManifestToRelease = (
  manifest: ReleaseManifest,
  type: OsReleaseType
): OsRelease => ({
  ...manifest,
  file: {
    ...manifest.file,
    size: Number(manifest.file.size),
  },
  type,
})

afterEach(() => {
  executionCount = 0
})

describe("Method: `getAllReleases`", () => {
  test("returns Result.success with formatted releases if each release request returns data", async () => {
    clientMock.getLatestRelease = jest.fn().mockImplementation(() => {
      executionCount++

      return [
        { data: productionReleaseManifest },
        { data: candidateReleaseManifest },
        { data: dailyReleaseManifest },
      ][executionCount - 1]
    })

    const result = await subject.getAllReleases(Product.PurePhone)

    expect(result).toEqual(
      Result.success([
        mapManifestToRelease(
          productionReleaseManifest,
          OsReleaseType.Production
        ),
        mapManifestToRelease(candidateReleaseManifest, OsReleaseType.Candidate),
        {
          ...mapManifestToRelease(dailyReleaseManifest, OsReleaseType.Daily),
          version: "1.2.3-daily.2022.8.12",
        },
      ])
    )
  })

  test("returns Result.failed if one of request returns error", async () => {
    clientMock.getLatestRelease = jest
      .fn()
      .mockRejectedValueOnce(new Error("Luke, I'm your error"))

    const result = await subject.getAllReleases(Product.PurePhone)

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.GetAllRelease,
          "Fail during retrieving of the release"
        )
      )
    )
  })
})

describe("Method: `getRelease`", () => {
  test("returns Result.success with formatted release if request returns data", async () => {
    clientMock.getLatestRelease = jest.fn().mockImplementation(() => {
      return { data: productionReleaseManifest }
    })

    const result = await subject.getLatestRelease(Product.PurePhone)

    expect(result).toEqual(
      Result.success(
        mapManifestToRelease(
          productionReleaseManifest,
          OsReleaseType.Production
        )
      )
    )
  })

  test("returns Result.failed if one of request returns error", async () => {
    clientMock.getLatestRelease = jest
      .fn()
      .mockRejectedValueOnce(new Error("Luke, I'm your error"))

    const result = await subject.getLatestRelease(Product.PurePhone)

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.GetAllRelease,
          "Fail during retrieving of the release"
        )
      )
    )
  })
})

describe("Method: `getReleasesByVersions`", () => {
  test("returns Result.success with formatted releases if each release request returns data", async () => {
    clientMock.getLatestRelease = jest.fn().mockImplementation(() => {
      executionCount++

      return [
        {
          data: {
            ...productionReleaseManifest,
            version: "1.1.0",
          },
        },
        {
          data: {
            ...productionReleaseManifest,
            version: "1.2.0",
          },
        },
      ][executionCount - 1]
    })

    const result = await subject.getReleasesByVersions({
      product: Product.PurePhone,
      versions: ["1.1.0", "1.2.0"],
    })

    expect(result).toEqual(
      Result.success([
        {
          ...mapManifestToRelease(
            productionReleaseManifest,
            OsReleaseType.Production
          ),
          version: "1.1.0",
        },
        {
          ...mapManifestToRelease(
            productionReleaseManifest,
            OsReleaseType.Production
          ),
          version: "1.2.0",
        },
      ])
    )
  })

  test("returns Result.failed if one of request returns error", async () => {
    clientMock.getLatestRelease = jest
      .fn()
      .mockRejectedValueOnce(new Error("Luke, I'm your error"))

    const result = await subject.getReleasesByVersions({
      product: Product.PurePhone,
      versions: ["1.1.0", "1.2.0"],
    })

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.GetReleasesByVersion,
          "Fail during retrieving of the releases"
        )
      )
    )
  })
})
