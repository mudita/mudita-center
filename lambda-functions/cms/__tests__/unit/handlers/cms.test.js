const cms = require("../../../src/handlers/cms.js")

jest.mock("contentful", () => ({
  createClient: (config) => {
    const resource = config.accessToken === "mc-contentful" ? "mc" : "web"
    return {
      getEntries: () => `entries ${resource}`,
      sync: () => `sync ${resource}`,
    }
  },
}))

const OLD_ENV = process.env
beforeEach(() => {
  jest.resetModules()
  process.env = {
    ...OLD_ENV,
    MC_CONTENTFUL_ACCESS_TOKEN: "mc-contentful",
    MUDITA_WEB_CONTENTFUL_ACCESS_TOKEN: "web-contentful",
  }
})

afterAll(() => {
  process.env = OLD_ENV
})

test("proper request for help data", async () => {
  const payload = {
    httpMethod: "POST",
    body: JSON.stringify({
      resource: "help",
      method: "sync",
      query: {
        type: "Entry",
        content_type: "helpItem",
        locale: "en-US",
        initial: true,
      },
    }),
  }
  const result = await cms.retrieveCMSData(payload)
  expect(result).toEqual(
    expect.objectContaining({
      body: JSON.stringify("sync mc"),
      statusCode: 200,
    })
  )
})

test("proper request for news data", async () => {
  const payload = {
    httpMethod: "POST",
    body: JSON.stringify({
      resource: "news",
      method: "getEntries",
      query: {
        content_type: "newsItem",
        limit: 3,
      },
    }),
  }
  const result = await cms.retrieveCMSData(payload)
  expect(result).toEqual(
    expect.objectContaining({
      body: JSON.stringify("entries web"),
      statusCode: 200,
    })
  )
})

test("returns 405 if requests method is different than POST", async () => {
  const payload = {
    httpMethod: "GET",
  }
  const result = await cms.retrieveCMSData(payload)
  expect(result).toEqual(
    expect.objectContaining({
      statusCode: 405,
    })
  )
})
