import { renderHook } from "@testing-library/react-hooks"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import { History, Location } from "history"
import contacts from "App/contacts/store/contacts"
import selectPlugin from "@rematch/select"
import { contactsSeed } from "App/seeds/contacts"
import { init, ModelConfig, RematchStore } from "@rematch/core"
import { URL_MAIN } from "Renderer/constants/urls"
// const fakeListener = jest.fn(() => ({
//   location: {
//     pathname: "pathname",
//   },
// }))

const location: Location = {
  pathname: URL_MAIN.contacts,
  search: "",
  hash: "",
  state: undefined,
}



const fakeHistory: Pick<History, "listen"> = {
  listen(listener) {
    return () => listener(location, "PUSH")
  },
}

const storeConfig = {
  models: {contacts},
  plugins: [selectPlugin()],
  redux: {
    initialState: {
      contacts: contactsSeed,
    },
  },
}

let store: RematchStore<{ contacts: ModelConfig }> = init(storeConfig)

test("should ", () => {
  const result = renderHook(() => useRouterListener(fakeHistory, store))
  console.log("result", result)
  result.rerender()
  expect(store.dispatch.contacts.loadData).toBeCalled()
  // expect(fakeListener).toBeCalled()
})
