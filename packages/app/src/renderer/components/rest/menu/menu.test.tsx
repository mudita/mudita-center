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

const mockStore = createMockStore([thunk])

describe("Device: Mudita pure", () => {
  test("matches snapshot", () => {
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
})

describe("Device: Mudita harmony", () => {
  test("matches snapshot", () => {
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
