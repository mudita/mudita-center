import axios from "axios"
import { init } from "@rematch/core"
import wrapper from "./wrapper"
import auth from "Renderer/models/auth/auth"

const TEST_TOKEN = "token-12345"
const TEST_TOKEN_TYPE = "Bearer"

jest.mock("axios")
const mockedAxios = axios as any

test("properly fetches the data when credentials are in place", async () => {
  const TEST_RESPONSE = { response: "OK" }
  const store = init({
    models: { auth },
    redux: {
      initialState: {
        auth: {
          google: {
            access_token: TEST_TOKEN,
            token_type: TEST_TOKEN_TYPE,
          },
        },
      },
    },
  })

  mockedAxios.mockResolvedValue(TEST_RESPONSE)

  const call = await wrapper("/any", "GET", {}, store as any)
  expect(call).toMatchObject(TEST_RESPONSE)
})

test("throws when credentials are not present", async () => {
  const TEST_RESPONSE = { response: "OK" }
  const store = init({
    models: { auth },
    redux: {
      initialState: {
        auth: {},
      },
    },
  })

  mockedAxios.mockResolvedValue(TEST_RESPONSE)

  await expect(
    async () => await wrapper("/any", "GET", {}, store as any)
  ).rejects.toStrictEqual(Error("Missing credentials"))
})
