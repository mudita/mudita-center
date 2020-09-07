import axios from "axios"
import { init } from "@rematch/core"
import wrapper from "./wrapper"
import auth from "Renderer/models/auth/auth"
import { AuthKeys } from "Renderer/models/auth/auth.helpers"

const testToken = "token-12345"
const testTokenType = "Bearer"

jest.mock("axios")
const mockedAxios = axios as any // just an assign

test("properly fetches the data when credentials are in place", async () => {
  const testResponse = { response: "OK" }
  const store = init({
    models: { auth },
    redux: {
      initialState: {
        auth: {
          google: {
            [AuthKeys.Token]: testToken,
            [AuthKeys.TokenType]: testTokenType,
          },
        },
      },
    },
  })

  mockedAxios.mockResolvedValue(testResponse)

  const call = await wrapper("/any", "GET", {}, store as any)
  expect(call).toMatchObject(testResponse)
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
