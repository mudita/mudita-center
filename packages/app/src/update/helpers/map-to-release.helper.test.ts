/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GithubRelease } from "App/update/types"
import {
  findXTarAsset,
  isDraft,
  getPrerelease,
  getVersion,
} from "App/update/helpers/map-to-release.helper"

const githubRelease: GithubRelease = {
  tag_name: "0.76.4",
  draft: false,
  prerelease: false,
  created_at: "2021-09-09T19:28:18Z",
  published_at: "2021-09-10T06:46:59Z",
  assets: [
    {
      url: "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445199",
      name: "PurePhone-release-0.76.4-RT1051-image.tar.xz",
      content_type: "application/x-xz",
      size: 36763852,
      browser_download_url:
        "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445199/PurePhone-release-0.76.4-RT1051-image.tar.xz",
    },
    {
      url: "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445203",
      name: "PurePhone-release-0.76.4-RT1051-Update.tar",
      content_type: "application/x-tar",
      size: 43868160,
      browser_download_url:
        "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445203/PurePhone-release-0.76.4-RT1051-Update.tar",
    },
  ],
}

describe("getVersion, function", () => {
  test("should return the product version from tag name", () => {
    expect(getVersion("pure_1.2.3")).toEqual("1.2.3")
    expect(getVersion("bell_1.2.3")).toEqual("1.2.3")
    expect(getVersion("pure_1.2.3-rc.1")).toEqual("1.2.3-rc.1")
    expect(getVersion("pure_1.2.3-alpha.1")).toEqual("1.2.3-alpha.1")
  })
})

describe("isDraft function", () => {
  test("should return true if release is draft", () => {
    const release: GithubRelease = {
      ...githubRelease,
      draft: true,
    }

    expect(isDraft(release)).toBeTruthy()
  })

  test("should return false if release is draft", () => {
    const release: GithubRelease = {
      ...githubRelease,
      draft: false,
    }

    expect(isDraft(release)).toBeFalsy()
  })
})

describe("findXTarAsset function", () => {
  test("should return undefined when x-tar file isn't exist in assets", () => {
    const release: GithubRelease = {
      ...githubRelease,
      assets: [
        {
          url: "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445199",
          name: "PurePhone-release-0.76.4-RT1051-image.tar.xz",
          content_type: "application/x-xz",
          size: 36763852,
          browser_download_url:
            "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445199/PurePhone-release-0.76.4-RT1051-image.tar.xz",
        },
      ],
    }

    expect(findXTarAsset(release)).toBeUndefined()
  })

  test("should return asset when x-tar file is exist in assets", () => {
    expect(findXTarAsset(githubRelease)).not.toBeUndefined()
  })
})

const productionGithubRelease = githubRelease
const testProductionGithubRelease = {
  ...githubRelease,
  prerelease: false,
  tag_name: "0.76.4-rc.1",
}
const productionAlphaRelease = {
  ...githubRelease,
  prerelease: false,
  tag_name: "0.76.4-alpha",
}
const testProductionAlphaRelease = {
  ...githubRelease,
  prerelease: false,
  tag_name: "0.76.4-alpha.1",
}

describe("getPrerelease util", () => {
  test("should return false when release is Production Release ", () => {
    expect(getPrerelease(productionGithubRelease)).toBeFalsy()
  })
  test("should return true when release is Test Production Release ", () => {
    expect(getPrerelease(testProductionGithubRelease)).toBeTruthy()
  })
  test("should return true when release is Production Alpha Release ", () => {
    expect(getPrerelease(productionAlphaRelease)).toBeTruthy()
  })
  test("should return true when release is Test Production Alpha Release ", () => {
    expect(getPrerelease(testProductionAlphaRelease)).toBeTruthy()
  })
})
