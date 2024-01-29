/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderHook, RenderHookResult } from "@testing-library/react"
import { createMemoryHistory, History } from "history"
import { Router } from "react-router"
import {
  useRouterListener,
  Values,
} from "Core/core/hooks/use-router-listener.hook"
import {
  URL_MAIN,
  URL_TABS,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import { MemoryHistory } from "history/createMemoryHistory"

let history: MemoryHistory
const mockDispatch = jest.fn()

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}))

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

export function renderHookWithRouter<Result, Props>(
  render: (initialProps: Props) => Result,
  history: History
): RenderHookResult<Result, Props> {
  return renderHook(render, {
    wrapper: ({ children }) => <Router history={history}>{children}</Router>,
  })
}

beforeEach(() => {
  history = createMemoryHistory()
})

afterEach(() => {
  jest.resetAllMocks()
})

test("action on wrong path is not called", () => {
  const contactsAction = jest.fn()
  const { rerender } = renderHookWithRouter(
    () =>
      useRouterListener({
        [URL_OVERVIEW.root]: [contactsAction],
      }),
    history
  )

  history.push(URL_MAIN.contacts)

  rerender()

  expect(contactsAction).not.toBeCalled()
})

test("actions are called on correct location render", () => {
  const contactsAction = jest.fn()
  const { rerender } = renderHookWithRouter(
    () =>
      useRouterListener({
        [URL_MAIN.contacts]: [contactsAction, contactsAction],
      }),
    history
  )

  expect(mockDispatch).not.toHaveBeenCalled()
  expect(contactsAction).not.toBeCalledTimes(2)
  history.push(URL_MAIN.contacts)

  rerender()

  expect(contactsAction).toBeCalledTimes(2)
  expect(mockDispatch).toHaveBeenCalled()
})

test("actions in nested routes are handled", () => {
  const nestedRouteAction = jest.fn()
  const pathname = `${URL_MAIN.messages}${URL_TABS.templates}` as Values
  const { rerender } = renderHookWithRouter(
    () =>
      useRouterListener({
        [pathname]: [nestedRouteAction],
      }),
    history
  )
  expect(mockDispatch).not.toHaveBeenCalled()
  expect(nestedRouteAction).not.toBeCalled()
  history.push(`${URL_MAIN.messages}${URL_TABS.templates}`)

  rerender()

  expect(nestedRouteAction).toBeCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalled()
})
