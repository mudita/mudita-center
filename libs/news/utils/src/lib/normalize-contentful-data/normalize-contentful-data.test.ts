/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { normalizeContentfulData } from "./normalize-contentful-data"
import { NewsData } from "news/models"

jest.mock("../get-base64/get-base64", () => ({
  getBase64: jest.fn().mockReturnValue("data:base64"),
}))

const entryCollectionMock: NewsData = {
  items: [
    {
      sys: {
        id: "9YFH9NLyIvt8Z1dDEc1nf",
        createdAt: "2019-07-11T08:58:38.928Z",
        updatedAt: "2021-08-05T11:50:35.157Z",
      },
      fields: {
        category: "Forum",
        title: "Join the discussion",
        content:
          "Why do so many potential backers want the Pure to work like a smartphone?",
        image: {
          sys: {
            id: "5yROcTiCUf3XxANZwAPfUx",
          },
          fields: {
            title: "Staring at screens",
            file: {
              url: "//images.ctfassets.net/isxmxtc67n72/5yROcTiCUf3XxANZwAPfUx/40a4d53d9b69e9df03931eb6e0efdc17/IMG_8645.jpg",
            },
          },
        },
        communityLink:
          "https://forum.mudita.com/t/why-do-so-many-potential-backers-want-the-pure-to-work-like-a-smartphone/1462",
        link: "https://forum.mudita.com/t/why-do-so-many-potential-backers-want-the-pure-to-work-like-a-smartphone/1462/87",
        discussionId: "1462",
        commentsCount: 99,
        date: "2020-08-02T20:02:45.263Z",
      },
    },
  ],
  includes: {
    Asset: [
      {
        sys: {
          id: "5yROcTiCUf3XxANZwAPfUx",
        },
        fields: {
          title: "Staring at screens",
          file: {
            url: "//images.ctfassets.net/isxmxtc67n72/5yROcTiCUf3XxANZwAPfUx/40a4d53d9b69e9df03931eb6e0efdc17/IMG_8645.jpg",
          },
        },
      },
    ],
  },
}

const normalizedMock = {
  newsItems: [
    {
      category: "Forum",
      title: "Join the discussion",
      content:
        "Why do so many potential backers want the Pure to work like a smartphone?",
      image: {
        sys: {
          id: "5yROcTiCUf3XxANZwAPfUx",
        },
        fields: {
          title: "Staring at screens",
          file: {
            url: "//images.ctfassets.net/isxmxtc67n72/5yROcTiCUf3XxANZwAPfUx/40a4d53d9b69e9df03931eb6e0efdc17/IMG_8645.jpg",
          },
        },
      },
      communityLink:
        "https://forum.mudita.com/t/why-do-so-many-potential-backers-want-the-pure-to-work-like-a-smartphone/1462",
      link: "https://forum.mudita.com/t/why-do-so-many-potential-backers-want-the-pure-to-work-like-a-smartphone/1462/87",
      discussionId: "1462",
      commentsCount: 99,
      date: "2020-08-02T20:02:45.263Z",
      newsId: "9YFH9NLyIvt8Z1dDEc1nf",
      updatedAt: "2021-08-05T11:50:35.157Z",
      createdAt: "2019-07-11T08:58:38.928Z",
      imageId: "5yROcTiCUf3XxANZwAPfUx",
      imageSource: "data:base64",
      imageAlt: "Staring at screens",
    },
  ],
  lastUpdate: "2021-08-05T11:50:35.157Z",
}

beforeAll(() => {
  jest.useFakeTimers({ now: new Date("2021-08-05T11:50:35.157Z") })
})

afterAll(() => {
  jest.useRealTimers()
})

test("Normalized contentful data properly", async () => {
  expect(await normalizeContentfulData(entryCollectionMock)).toEqual(
    normalizedMock
  )
})
