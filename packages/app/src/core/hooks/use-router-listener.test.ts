/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook } from "@testing-library/react-hooks"
import { useRouterListener } from "App/core/hooks/use-router-listener.hook"
import { createMemoryHistory } from "history"
import {
  URL_MAIN,
  URL_TABS,
  URL_OVERVIEW,
} from "App/__deprecated__/renderer/constants/urls"
import { MemoryHistory } from "history/createMemoryHistory"

let history: MemoryHistory
const mockDispatch = jest.fn()

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}))

beforeEach(() => {
  history = createMemoryHistory()
})

afterEach(() => {
  jest.resetAllMocks()
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("action on wrong path is not called", async () => {
  const contactsAction = jest.fn()
  const { rerender } = renderHook(() =>
    useRouterListener(history, {
      [URL_OVERVIEW.root]: [contactsAction],
    })
  )

  history.push(URL_MAIN.contacts)

  rerender()

  expect(contactsAction).not.toBeCalled()
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("actions are called on correct location render", async () => {
  const contactsAction = jest.fn()
  const { rerender } = renderHook(() =>
    useRouterListener(history, {
      [URL_MAIN.contacts]: [contactsAction, contactsAction],
    })
  )

  expect(mockDispatch).not.toHaveBeenCalled()
  expect(contactsAction).not.toBeCalledTimes(2)
  history.push(URL_MAIN.contacts)

  rerender()

  expect(contactsAction).toBeCalledTimes(2)
  expect(mockDispatch).toHaveBeenCalled()
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("actions in nested routes are handled", async () => {
  const nestedRouteAction = jest.fn()
  const { rerender } = renderHook(() =>
    useRouterListener(history, {
      [`${URL_MAIN.messages}${URL_TABS.templates}`]: [nestedRouteAction],
    })
  )

  expect(mockDispatch).not.toHaveBeenCalled()
  expect(nestedRouteAction).not.toBeCalled()
  history.push(`${URL_MAIN.messages}${URL_TABS.templates}`)

  rerender()

  expect(nestedRouteAction).toBeCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalled()
})
