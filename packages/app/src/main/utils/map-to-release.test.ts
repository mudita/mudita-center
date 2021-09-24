/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GithubRelease } from "App/main/functions/register-get-all-releases-listener"
import mapToReleases, {
  cleanDirtRelease,
  findXTarAsset,
  isProductionAlphaRelease,
  isDraft,
  isProductionRelease,
  isTestProductionAlphaRelease,
  isTestProductionRelease,
  getPrerelease,
} from "App/main/utils/map-to-release"
import OsReleasesManager from "App/main/utils/os-releases-manager"

const githubRelease: GithubRelease = {
  tag_name: "release-0.76.4",
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
    },
    {
      url: "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445203",
      name: "PurePhone-release-0.76.4-RT1051-Update.tar",
      content_type: "application/x-tar",
      size: 43868160,
    },
  ],
}

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
        },
      ],
    }

    expect(findXTarAsset(release)).toBeUndefined()
  })

  test("should return asset when x-tar file is exist in assets", () => {
    expect(findXTarAsset(githubRelease)).not.toBeUndefined()
  })
})

describe("cleanDirtRelease function", () => {
  test("the tag_name should be the same when hasn't any dirt tag_name prefix", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4",
    }
    expect(cleanDirtRelease(release).tag_name).toEqual(release.tag_name)
  })

  test("the tag_name should be free from the `release-` prefix", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "release-0.76.4",
    }
    expect(cleanDirtRelease(release).tag_name).toEqual("0.76.4")
  })

  test("the tag_name should be free from the `daily-` prefix", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "daily-0.76.4",
    }
    expect(cleanDirtRelease(release).tag_name).toEqual("0.76.4")
  })

  test("the tag_name doesn't replace no indicate prefixes", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "noname-0.76.4",
    }
    expect(cleanDirtRelease(release).tag_name).toEqual(release.tag_name)
  })
})

describe("isProductionRelease function", () => {
  test("should return true if prerelease is to false and tag_name doesn't set prefix and any prerelease ", () => {
    const release: GithubRelease = {
      ...githubRelease,
      prerelease: false,
      tag_name: "0.76.4",
    }
    expect(isProductionRelease(release)).toBeTruthy()
  })

  test("should return false if tag_name has set pre release ", () => {
    const release: GithubRelease = {
      ...githubRelease,
      prerelease: false,
      tag_name: "0.76.4-rc.1",
    }
    expect(isProductionRelease(release)).toBeFalsy()
  })

  test("should return false if prerelease is to true", () => {
    const release: GithubRelease = {
      ...githubRelease,
      prerelease: true,
      tag_name: "0.76.4",
    }
    expect(isProductionRelease(release)).toBeFalsy()
  })
})

describe("isTestProductionRelease function", () => {
  test("should return true when tag_name has set two prerelease labels like rc and digit", () => {
    const release: GithubRelease = {
      ...githubRelease,
      prerelease: true,
      tag_name: "0.76.4-rc.1",
    }
    expect(isTestProductionRelease(release)).toBeTruthy()
  })

  test("should return true even when prerelease is set to false", () => {
    const release: GithubRelease = {
      ...githubRelease,
      prerelease: false,
      tag_name: "0.76.4-rc.1",
    }
    expect(isTestProductionRelease(release)).toBeTruthy()
  })

  test("should return false if second label of prerelease isn't digit", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-rc.internal",
    }
    expect(isTestProductionRelease(release)).toBeFalsy()
  })

  test("should return false when tag_name has set only one prerelease to rc", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-rc",
    }
    expect(isTestProductionRelease(release)).toBeFalsy()
  })

  test("should return false when any prerelease isn't set", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4",
    }
    expect(isTestProductionRelease(release)).toBeFalsy()
  })
})

describe("isProductionAlphaRelease function", () => {
  test("should return true when tag_name has set prerelease to alpha", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-alpha",
    }
    expect(isProductionAlphaRelease(release)).toBeTruthy()
  })

  test("should return false when tag_name has set two prerelease labels like alpha and digit", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-alpha.1",
    }
    expect(isProductionAlphaRelease(release)).toBeFalsy()
  })

  test("should return false if first label isn't set to alpha", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-rc",
    }
    expect(isProductionAlphaRelease(release)).toBeFalsy()
  })

  test("should return false when prerelease isn't set", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4",
    }
    expect(isProductionAlphaRelease(release)).toBeFalsy()
  })
})

describe("isTestProductionAlphaRelease function", () => {
  test("should return true when tag_name has set two prerelease labels like alpha and digit", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-alpha.1",
    }
    expect(isTestProductionAlphaRelease(release)).toBeTruthy()
  })

  test("should return false if second label of prerelease isn't digit", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-alpha.rc",
    }
    expect(isTestProductionAlphaRelease(release)).toBeFalsy()
  })

  test("should return false when tag_name has set only one prerelease to alpha", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-alpha",
    }
    expect(isTestProductionAlphaRelease(release)).toBeFalsy()
  })

  test("should return false if first label isn't set to alpha", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4-rc.1",
    }
    expect(isTestProductionAlphaRelease(release)).toBeFalsy()
  })

  test("should return false when prerelease isn't set", () => {
    const release: GithubRelease = {
      ...githubRelease,
      tag_name: "0.76.4",
    }
    expect(isProductionAlphaRelease(release)).toBeFalsy()
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
  test("should return true when release is Production Release ", () => {
    expect(getPrerelease(productionGithubRelease)).toBeTruthy()
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

jest.mock("App/main/utils/os-releases-manager")

const mockOsReleasesManager = ({
  productionAvaible = false,
  testProductionAvaible = false,
  productionAlphaAvaible = false,
  testProductionAlphaAvaible = false,
}: any) => {
  OsReleasesManager.isProductionAvaible = jest
    .fn()
    .mockReturnValue(productionAvaible)
  OsReleasesManager.isTestProductionAvaible = jest
    .fn()
    .mockReturnValue(testProductionAvaible)
  OsReleasesManager.isProductionAlphaAvaible = jest
    .fn()
    .mockReturnValue(productionAlphaAvaible)
  OsReleasesManager.isTestProductionAlphaAvaible = jest
    .fn()
    .mockReturnValue(testProductionAlphaAvaible)
}

describe("filterRelease util", () => {
  describe("when all of release kinds are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvaible: true,
        testProductionAvaible: true,
        productionAlphaAvaible: true,
        testProductionAlphaAvaible: true,
      })
    })

    test("should filtered each included drafts from list", () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        {
          ...githubRelease,
          draft: true,
        },
      ]

      expect(mapToReleases(githubReleases)).toHaveLength(1)
    })

    test("should filtered release where x-tar file isn't exist", () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        {
          ...githubRelease,
          assets: [
            {
              url: "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445199",
              name: "PurePhone-release-0.76.4-RT1051-image.tar.xz",
              content_type: "application/x-xz",
              size: 36763852,
            },
          ],
        },
      ]

      expect(mapToReleases(githubReleases)).toHaveLength(1)
    })

    test("shouldn't filter any match release relative to OsReleasesManager configuration", () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      expect(mapToReleases(githubReleases)).toHaveLength(4)
    })
  })

  describe("when only OS Production Releases are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvaible: true,
        testProductionAvaible: false,
        productionAlphaAvaible: false,
        testProductionAlphaAvaible: false,
      })
    })

    test("should return only Production Releases", () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      expect(mapToReleases(githubReleases)).toHaveLength(1)
      expect(productionGithubRelease.tag_name).toContain(
        mapToReleases(githubReleases)[0].version
      )
    })
  })

  describe("when only OS Test Production Releases are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvaible: false,
        testProductionAvaible: true,
        productionAlphaAvaible: false,
        testProductionAlphaAvaible: false,
      })
    })

    test("should return only Test Production Releases", () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      expect(mapToReleases(githubReleases)).toHaveLength(1)
      expect(testProductionGithubRelease.tag_name).toContain(
        mapToReleases(githubReleases)[0].version
      )
    })
  })

  describe("when only OS Production Alpha Releases are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvaible: false,
        testProductionAvaible: false,
        productionAlphaAvaible: true,
        testProductionAlphaAvaible: false,
      })
    })

    test("should return only Production Alpha Releases Releases", () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      expect(mapToReleases(githubReleases)).toHaveLength(1)
      expect(productionAlphaRelease.tag_name).toContain(
        mapToReleases(githubReleases)[0].version
      )
    })
  })

  describe("when only OS Test Production Alpha Releases are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvaible: false,
        testProductionAvaible: false,
        productionAlphaAvaible: false,
        testProductionAlphaAvaible: true,
      })
    })

    test("should return only Test Production Alpha Releases", () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      expect(mapToReleases(githubReleases)).toHaveLength(1)
      expect(testProductionAlphaRelease.tag_name).toContain(
        mapToReleases(githubReleases)[0].version
      )
    })
  })
})
