/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GithubRelease } from "App/main/functions/register-get-all-releases-listener"
import mapToReleases, {
  findXTarAsset,
  isProductionAlphaRelease,
  isDraft,
  isProductionRelease,
  isTestProductionAlphaRelease,
  isTestProductionRelease,
  getPrerelease,
  getVersion,
} from "App/main/utils/map-to-release"
import OsReleasesManager from "App/main/utils/os-releases-manager"

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
    expect(isTestProductionRelease(release)).toBeTruthy()
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
  test("should return false when release is Production Release ", () => {
    expect(getPrerelease(productionGithubRelease)).toBeFalsy()
  })
  test("should return false when release is Test Production Release ", () => {
    expect(getPrerelease(testProductionGithubRelease)).toBeFalsy()
  })
  test("should return false when release is Production Alpha Release ", () => {
    expect(getPrerelease(productionAlphaRelease)).toBeFalsy()
  })
  test("should return false when release is Test Production Alpha Release ", () => {
    expect(getPrerelease(testProductionAlphaRelease)).toBeFalsy()
  })
})

jest.mock("App/main/utils/os-releases-manager")

interface MockOsReleasesManagerConfig {
  productionAvailable: boolean
  testProductionAvailable: boolean
  productionAlphaAvailable: boolean
  testProductionAlphaAvailable: boolean
}

const mockOsReleasesManager = ({
  productionAvailable,
  testProductionAvailable,
  productionAlphaAvailable,
  testProductionAlphaAvailable,
}: MockOsReleasesManagerConfig) => {
  OsReleasesManager.isProductionAvailable = jest
    .fn()
    .mockReturnValue(productionAvailable)
  OsReleasesManager.isTestProductionAvailable = jest
    .fn()
    .mockReturnValue(testProductionAvailable)
  OsReleasesManager.isProductionAlphaAvailable = jest
    .fn()
    .mockReturnValue(productionAlphaAvailable)
  OsReleasesManager.isTestProductionAlphaAvailable = jest
    .fn()
    .mockReturnValue(testProductionAlphaAvailable)
}

describe("filterRelease util", () => {
  describe("when all of release kinds are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvailable: true,
        testProductionAvailable: true,
        productionAlphaAvailable: true,
        testProductionAlphaAvailable: true,
      })
    })

    test("should filtered each included drafts from list", async () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        {
          ...githubRelease,
          draft: true,
        },
      ]

      const result = await mapToReleases(githubReleases)

      expect(result).toHaveLength(1)
    })

    test("should filtered release where x-tar file isn't exist", async () => {
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
              browser_download_url:
                "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445199/PurePhone-release-0.76.4-RT1051-image.tar.xz",
            },
          ],
        },
      ]

      const result = await mapToReleases(githubReleases)

      expect(result).toHaveLength(1)
    })

    test("shouldn't filter any match release relative to OsReleasesManager configuration", async () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      const result = await mapToReleases(githubReleases)

      expect(result).toHaveLength(4)
    })
  })

  describe("when only OS Production Releases are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvailable: true,
        testProductionAvailable: false,
        productionAlphaAvailable: false,
        testProductionAlphaAvailable: false,
      })
    })

    test("should return only Production Releases", async () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      const result = await mapToReleases(githubReleases)

      expect(result).toHaveLength(1)
      expect(productionGithubRelease.tag_name).toContain(result[0].version)
    })
  })

  describe("when only OS Test Production Releases are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvailable: false,
        testProductionAvailable: true,
        productionAlphaAvailable: false,
        testProductionAlphaAvailable: false,
      })
    })

    test("should return only Test Production Releases", async () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      const result = await mapToReleases(githubReleases)

      expect(result).toHaveLength(2)
      expect(testProductionGithubRelease.tag_name).toContain(result[0].version)
    })
  })

  describe("when only OS Production Alpha Releases are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvailable: false,
        testProductionAvailable: false,
        productionAlphaAvailable: true,
        testProductionAlphaAvailable: false,
      })
    })

    test("should return all Releases", async () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      const result = await mapToReleases(githubReleases)

      expect(result).toHaveLength(4)
      expect(productionAlphaRelease.tag_name).toContain(result[0].version)
    })
  })

  describe("when only OS Test Production Alpha Releases are available", () => {
    beforeEach(() => {
      mockOsReleasesManager({
        productionAvailable: false,
        testProductionAvailable: false,
        productionAlphaAvailable: false,
        testProductionAlphaAvailable: true,
      })
    })

    test("should return all Releases", async () => {
      const githubReleases: GithubRelease[] = [
        productionGithubRelease,
        testProductionGithubRelease,
        productionAlphaRelease,
        testProductionAlphaRelease,
      ]

      const result = await mapToReleases(githubReleases)

      expect(result).toHaveLength(4)
    })
  })
})
