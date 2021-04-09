/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook } from "@testing-library/react-hooks"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import { History, Location } from "history"
import { URL_MAIN } from "Renderer/constants/urls"
import { waitFor } from "@testing-library/react"
// import history from "Renderer/routes/history"

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

test("action on wrong path is not called", async () => {
  const contactsAction = jest.fn()
  renderHook(() =>
    useRouterListener(fakeHistory, {
      [URL_MAIN.overview]: contactsAction,
    })
  )
  await waitFor(() => expect(contactsAction).not.toBeCalled())
})

test("actions is called on correct location render", () => {
  const contactsAction = jest.fn()
  renderHook(() =>
    useRouterListener(fakeHistory, {
      [URL_MAIN.contacts]: contactsAction,
    })
  )
  waitFor(() => expect(contactsAction).toBeCalled()).then(() =>
    console.log(`action was called on location ${location.pathname}`)
  )
})
