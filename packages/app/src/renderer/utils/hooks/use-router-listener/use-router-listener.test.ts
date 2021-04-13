/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook } from "@testing-library/react-hooks"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import { createMemoryHistory } from "history"
import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"
import { MemoryHistory } from "history/createMemoryHistory"

let history: MemoryHistory
beforeEach(() => (history = createMemoryHistory()))

test("action on wrong path is not called", async () => {
  const contactsAction = jest.fn()
  const { rerender } = renderHook(() =>
    useRouterListener(history, {
      [URL_MAIN.overview]: [contactsAction],
    })
  )
  history.push(URL_MAIN.contacts)
  rerender()
  expect(contactsAction).not.toBeCalled()
})

test("actions are called on correct location render", async () => {
  const contactsAction = jest.fn()
  const { rerender } = renderHook(() =>
    useRouterListener(history, {
      [URL_MAIN.contacts]: [contactsAction, contactsAction],
    })
  )
  history.push(URL_MAIN.contacts)
  rerender()
  expect(contactsAction).toBeCalledTimes(2)
})

test("actions in nested routes are handled", async () => {
  const nestedRouteAction = jest.fn()
  const { rerender } = renderHook(() =>
    useRouterListener(history, {
      [`${URL_MAIN.messages}${URL_TABS.templates}`]: [nestedRouteAction],
    })
  )
  history.push(`${URL_MAIN.messages}${URL_TABS.templates}`)
  rerender()
  expect(nestedRouteAction).toBeCalledTimes(1)
})
