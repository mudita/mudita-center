/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Client } from "App/__deprecated__/api/mudita-center-server/client"
import * as CreateClientModule from "App/__deprecated__/api/mudita-center-server/create-client"
import { getUpdatedNews } from "App/__deprecated__/main/functions/register-news-listener/get-updated-news"
import { generateMockedNewsResponse } from "App/__deprecated__/main/functions/register-news-listener/__mocks__/generate-mocked-news-response"
import logger from "App/__deprecated__/main/utils/logger"
import * as normalizeContentfulDataModule from "App/news/helpers/normalize-contentful-data/normalize-contentful-data.helper"
import { NewsEntry } from "App/news/dto"
import { EntryCollection } from "contentful"
import fs from "fs-extra"

const normalizedContentfulDataMock = {
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

const mockedPath = `${__dirname}/__mocks__/mocked-news.json`
const writeJsonSpy = jest.spyOn(fs, "writeJson")
const loggerError = jest.spyOn(logger, "error")

beforeEach(() => {
  jest.resetAllMocks()
})

describe("when news are not found", () => {
  let result: unknown

  beforeEach(async () => {
    jest.spyOn(CreateClientModule, "createClient").mockImplementation(() => {
      return {
        getNews: () => ({ items: [] }),
      } as unknown as Client
    })

    result = await getUpdatedNews(mockedPath)
  })

  test("null is returned", () => {
    expect(result).toEqual(null)
  })

  test("updated news are not saved to file", () => {
    expect(writeJsonSpy).not.toHaveBeenCalled()
  })
})

describe("when news are found", () => {
  describe("when found news are older than local news from file", () => {
    let result: unknown

    beforeEach(async () => {
      jest.spyOn(CreateClientModule, "createClient").mockImplementation(() => {
        const data = generateMockedNewsResponse(
          "1999-06-28T16:12:27.412Z"
        ) as unknown as EntryCollection<NewsEntry>

        return {
          getNews: () => data,
        } as unknown as Client
      })

      result = await getUpdatedNews(mockedPath)
    })

    test("null is returned", () => {
      expect(result).toEqual(null)
    })
    test("updated news are not saved to file", () => {
      expect(writeJsonSpy).not.toHaveBeenCalled()
    })
  })

  describe("when found news are fresher than local news from file", () => {
    let result: unknown

    beforeEach(async () => {
      jest
        .spyOn(normalizeContentfulDataModule, "normalizeContentfulData")
        .mockResolvedValue(normalizedContentfulDataMock as any)

      jest.spyOn(CreateClientModule, "createClient").mockImplementation(() => {
        const data = generateMockedNewsResponse(
          "2023-06-28T16:12:27.412Z"
        ) as unknown as EntryCollection<NewsEntry>

        return {
          getNews: () => data,
        } as unknown as Client
      })

      result = await getUpdatedNews(mockedPath)
    })

    test("updated news are returned", () => {
      expect(result).toEqual(normalizedContentfulDataMock)
    })

    test("updated news are saved to file", () => {
      expect(writeJsonSpy).toHaveBeenCalled()
    })
  })
})

describe("when error appears during news fetch", () => {
  let result: unknown

  beforeEach(async () => {
    jest.spyOn(CreateClientModule, "createClient").mockImplementation(() => {
      throw new Error("Oups, something went wrong!")
    })

    result = await getUpdatedNews(mockedPath)
  })

  test("error is logged", () => {
    expect(loggerError).toHaveBeenCalledTimes(1)
  })

  test("null is returned", () => {
    expect(result).toEqual(null)
  })
})
