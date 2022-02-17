/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import React from "react"
import { Router } from "react-router"
import { Provider } from "react-redux"
import { DeviceType } from "@mudita/pure"
import Menu from "Renderer/components/rest/menu/menu.component"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { flags } from "App/feature-flags"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { SynchronizationState } from "App/data-sync/reducers"

jest.mock("App/feature-flags")

const mockStore = createMockStore([thunk])

describe("Device: Mudita pure", () => {
  test("matches snapshot", () => {
    jest.spyOn(flags, "get").mockReturnValue(true)
    const { container } = renderWithThemeAndIntl(
      <Provider
        store={mockStore({
          device: {
            deviceType: DeviceType.MuditaPure,
          },
        })}
      >
        <Router history={history}>
          <Menu />
        </Router>
      </Provider>
    )
    expect(container).toMatchSnapshot()
  })

  test("should show sync state if not loaded yet", () => {
    jest.spyOn(flags, "get").mockReturnValue(true)
    const { getByTestId } = renderWithThemeAndIntl(
      <Provider
        store={mockStore({
          device: {
            deviceType: DeviceType.MuditaPure,
          },
        })}
      >
        <Router history={history}>
          <Menu syncState={SynchronizationState.Cache} />
        </Router>
      </Provider>
    )
    expect(getByTestId(MenuGroupTestIds.Sync)).toBeInTheDocument()
  })
})

describe("Device: Mudita harmony", () => {
  test("matches snapshot", () => {
    jest.spyOn(flags, "get").mockReturnValue(true)
    const { container } = renderWithThemeAndIntl(
      <Provider
        store={mockStore({
          device: {
            deviceType: DeviceType.MuditaHarmony,
          },
        })}
      >
        <Router history={history}>
          <Menu />
        </Router>
      </Provider>
    )
    expect(container).toMatchSnapshot()
  })
})

test("Menu should have overview item", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)
  const { getByTestId } = renderWithThemeAndIntl(
    <Provider
      store={mockStore({
        device: {
          deviceType: DeviceType.MuditaHarmony,
        },
      })}
    >
      <Router history={history}>
        <Menu />
      </Router>
    </Provider>
  )
  expect(getByTestId(MenuGroupTestIds.Help)).toHaveTextContent(
    "[value] module.help"
  )
})
