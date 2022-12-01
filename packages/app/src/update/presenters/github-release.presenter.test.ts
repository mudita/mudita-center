/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GithubReleasePresenter } from "App/update/presenters"
import { ReleaseManifest } from "App/update/dto"
import { Product, ReleaseType } from "App/update/constants"

const productionReleaseManifest: ReleaseManifest = {
  version: "1.2.3",
  date: "Thu, 04 Aug 2022 09:57:33 GMT",
  product: Product.PurePhone,
  file: {
    url: "https://muditacenterosreleaseweb-muditaoslatestreleases07-fomskribsxjs.s3.eu-central-1.amazonaws.com/latest/PurePhone/PurePhone-1.3.0-RT1051-Update.tar",
    size: 156928000,
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
    size: 156928000,
    name: "PurePhone-1.3.0-RT1051-Update.tar",
  },
  mandatoryVersions: [],
}

const dailyReleaseManifest: ReleaseManifest = {
  version: "1.2.3-daily.2022.08.12",
  date: "Thu, 04 Aug 2022 09:57:33 GMT",
  product: Product.PurePhone,
  file: {
    url: "https://muditacenterosreleaseweb-muditaoslatestreleases07-fomskribsxjs.s3.eu-central-1.amazonaws.com/latest/PurePhone/PurePhone-1.3.0-RT1051-Update.tar",
    size: 156928000,
    name: "PurePhone-1.3.0-RT1051-Update.tar",
  },
  mandatoryVersions: [],
}

test("returns production release type if production version has been provided", () => {
  expect(GithubReleasePresenter.toRelease(productionReleaseManifest)).toEqual({
    version: "1.2.3",
    date: "Thu, 04 Aug 2022 09:57:33 GMT",
    type: ReleaseType.Production,
    product: Product.PurePhone,
    file: {
      url: "https://muditacenterosreleaseweb-muditaoslatestreleases07-fomskribsxjs.s3.eu-central-1.amazonaws.com/latest/PurePhone/PurePhone-1.3.0-RT1051-Update.tar",
      size: 156928000,
      name: "PurePhone-1.3.0-RT1051-Update.tar",
    },
    mandatoryVersions: ["1.2.2"],
  })
})

test("returns candidate release type if candidate version has been provided", () => {
  expect(GithubReleasePresenter.toRelease(candidateReleaseManifest)).toEqual({
    version: "1.2.3-rc.1",
    date: "Thu, 04 Aug 2022 09:57:33 GMT",
    type: ReleaseType.Candidate,
    product: Product.PurePhone,
    file: {
      url: "https://muditacenterosreleaseweb-muditaoslatestreleases07-fomskribsxjs.s3.eu-central-1.amazonaws.com/latest/PurePhone/PurePhone-1.3.0-RT1051-Update.tar",
      size: 156928000,
      name: "PurePhone-1.3.0-RT1051-Update.tar",
    },
    mandatoryVersions: [],
  })
})

test("returns daily release type with formatted version if daily version has been provided", () => {
  expect(GithubReleasePresenter.toRelease(dailyReleaseManifest)).toEqual({
    version: "1.2.3-daily.2022.8.12",
    date: "Thu, 04 Aug 2022 09:57:33 GMT",
    type: ReleaseType.Daily,
    product: Product.PurePhone,
    file: {
      url: "https://muditacenterosreleaseweb-muditaoslatestreleases07-fomskribsxjs.s3.eu-central-1.amazonaws.com/latest/PurePhone/PurePhone-1.3.0-RT1051-Update.tar",
      size: 156928000,
      name: "PurePhone-1.3.0-RT1051-Update.tar",
    },
    mandatoryVersions: [],
  })
})
