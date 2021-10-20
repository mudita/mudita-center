/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntryCollection } from "contentful"
import { NewsEntry } from "App/news/store/mudita-news.interface"
import { mockDate } from "App/testing-support"
import { normalizeContentfulData } from "./normalize-contentful-data.helpers"

jest.mock("./get-base64.helpers", () => ({
  getBase64: jest.fn().mockReturnValue("data:base64"),
}))

const resetMock = mockDate(new Date("2021-08-05T11:50:35.157Z"))

const entryCollectionMock = {
  sys: {
    type: "Array",
  },
  total: 6,
  skip: 0,
  limit: 6,
  items: [
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "isxmxtc67n72",
          },
        },
        id: "9YFH9NLyIvt8Z1dDEc1nf",
        type: "Entry",
        createdAt: "2019-07-11T08:58:38.928Z",
        updatedAt: "2021-08-05T11:50:35.157Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        revision: 34,
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "newsItem",
          },
        },
        locale: "en-US",
      },
      fields: {
        category: "Forum",
        title: "Join the discussion",
        content:
          "Why do so many potential backers want the Pure to work like a smartphone?",
        image: {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: "Link",
                linkType: "Space",
                id: "isxmxtc67n72",
              },
            },
            id: "5yROcTiCUf3XxANZwAPfUx",
            type: "Asset",
            createdAt: "2021-07-14T11:58:26.761Z",
            updatedAt: "2021-07-14T11:58:26.761Z",
            environment: {
              sys: {
                id: "master",
                type: "Link",
                linkType: "Environment",
              },
            },
            revision: 1,
            locale: "en-US",
          },
          fields: {
            title: "Staring at screens",
            file: {
              url: "//images.ctfassets.net/isxmxtc67n72/5yROcTiCUf3XxANZwAPfUx/40a4d53d9b69e9df03931eb6e0efdc17/IMG_8645.jpg",
              details: {
                size: 1716770,
                image: {
                  width: 4032,
                  height: 3024,
                },
              },
              fileName: "IMG_8645.jpg",
              contentType: "image/jpeg",
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
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "isxmxtc67n72",
            },
          },
          id: "5yROcTiCUf3XxANZwAPfUx",
          type: "Asset",
          createdAt: "2021-07-14T11:58:26.761Z",
          updatedAt: "2021-07-14T11:58:26.761Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-US",
        },
        fields: {
          title: "Staring at screens",
          file: {
            url: "//images.ctfassets.net/isxmxtc67n72/5yROcTiCUf3XxANZwAPfUx/40a4d53d9b69e9df03931eb6e0efdc17/IMG_8645.jpg",
            details: {
              size: 1716770,
              image: {
                width: 4032,
                height: 3024,
              },
            },
            fileName: "IMG_8645.jpg",
            contentType: "image/jpeg",
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
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "isxmxtc67n72",
            },
          },
          id: "5yROcTiCUf3XxANZwAPfUx",
          type: "Asset",
          createdAt: "2021-07-14T11:58:26.761Z",
          updatedAt: "2021-07-14T11:58:26.761Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-US",
        },
        fields: {
          title: "Staring at screens",
          file: {
            url: "//images.ctfassets.net/isxmxtc67n72/5yROcTiCUf3XxANZwAPfUx/40a4d53d9b69e9df03931eb6e0efdc17/IMG_8645.jpg",
            details: {
              size: 1716770,
              image: {
                width: 4032,
                height: 3024,
              },
            },
            fileName: "IMG_8645.jpg",
            contentType: "image/jpeg",
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

afterAll(() => {
  jest.clearAllMocks()
  resetMock()
})

test("", async () => {
  expect(
    await normalizeContentfulData(
      entryCollectionMock as unknown as EntryCollection<NewsEntry>
    )
  ).toEqual(normalizedMock)
})
