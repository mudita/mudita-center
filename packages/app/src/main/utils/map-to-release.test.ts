/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { GithubRelease } from "App/main/functions/register-get-all-releases-listener"
import mapToReleases from "App/main/utils/map-to-release"

const productionGithubRelease: GithubRelease = {
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

describe("mapToRelease util", () => {
  describe("when a single item in a list is Production Github Release", () => {
    const githubReleases: GithubRelease[] = [productionGithubRelease]

    test("should return correct length", () => {
      expect(mapToReleases(githubReleases)).toHaveLength(1)
    })

    test("the prerelease property should set to false", () => {
      const release = mapToReleases(githubReleases)[0]
      expect(release.prerelease).toBeFalsy()
    })

    test("should be properly mapped", () => {
      expect(mapToReleases(githubReleases)).toMatchInlineSnapshot(`
        Array [
          Object {
            "date": "2021-09-10T06:46:59Z",
            "file": Object {
              "name": "PurePhone-release-0.76.4-RT1051-Update.tar",
              "size": 43868160,
              "url": "https://api.github.com/repos/mudita/MuditaOS/releases/assets/44445203",
            },
            "prerelease": false,
            "version": "0.76.4",
          },
        ]
      `)
    })
  })

  describe("when a single item in a list is mark as draft", () => {
    const githubReleases: GithubRelease[] = [
      {
        ...productionGithubRelease,
        draft: true,
      },
    ]
    test("should filtered drafts from list", () => {
      expect(mapToReleases(githubReleases)).toHaveLength(0)
    })
  })

  describe("when a single item in a list hasn't correct assets", () => {
    const githubReleases: GithubRelease[] = [
      {
        ...productionGithubRelease,
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

    test("should filtered release where x-tar file isn't exist", () => {
      expect(mapToReleases(githubReleases)).toHaveLength(0)
    })
  })

  describe("when a single item in a list has been set rc3 as suffix in tag_name", () => {
    const githubReleases: GithubRelease[] = [
      {
        ...productionGithubRelease,
        tag_name: "release-0.76.4-rc3"
      },
    ]

    test("should return correct length", () => {
      expect(mapToReleases(githubReleases)).toHaveLength(1)
    })

    test("the prerelease property should set to true", () => {
      const release = mapToReleases(githubReleases)[0]
      expect(release.prerelease).toBeTruthy()
    })
  })

  describe("when a single item in a list has been set internal as suffix in tag_name", () => {
    const githubReleases: GithubRelease[] = [
      {
        ...productionGithubRelease,
        tag_name: "release-0.76.4-internal"
      },
    ]

    test("should return correct length", () => {
      expect(mapToReleases(githubReleases)).toHaveLength(1)
    })

    test("the prerelease property should set to true", () => {
      const release = mapToReleases(githubReleases)[0]
      expect(release.prerelease).toBeTruthy()
    })
  })

  describe("when a single item in a list has been set daily as prefix in the tag_name", () => {
    const githubReleases: GithubRelease[] = [
      {
        ...productionGithubRelease,
        tag_name: "daily-0.76.4-2021.09.22"
      },
    ]

    test("should return correct length", () => {
      expect(mapToReleases(githubReleases)).toHaveLength(1)
    })

    test("the prerelease property should set to true", () => {
      const release = mapToReleases(githubReleases)[0]
      expect(release.prerelease).toBeTruthy()
    })
  })

  describe("when a single item in a list hasn't any prefix in the tag_name", () => {
    const githubReleases: GithubRelease[] = [
      {
        ...productionGithubRelease,
        tag_name: "0.76.4"
      },
    ]

    test("should return correct length", () => {
      expect(mapToReleases(githubReleases)).toHaveLength(1)
    })

    test("the prerelease property should set to false", () => {
      const release = mapToReleases(githubReleases)[0]
      expect(release.prerelease).toBeFalsy()
    })
  })

  describe("when a single item in a list hasn't prefix and set rc label in the tag_name", () => {
    const githubReleases: GithubRelease[] = [
      {
        ...productionGithubRelease,
        tag_name: "0.76.4-rc.1"
      },
    ]

    test("should return correct length", () => {
      expect(mapToReleases(githubReleases)).toHaveLength(1)
    })

    // should be false in the new version semantic (no covered in the stable)
    test("the prerelease property should set to true", () => {
      const release = mapToReleases(githubReleases)[0]
      expect(release.prerelease).toBeTruthy()
    })
  })
})
