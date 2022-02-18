/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import React, { ComponentProps } from "react"
import { Router } from "react-router"
import { Provider } from "react-redux"
import { DeviceType } from "@mudita/pure"
import Menu from "Renderer/components/rest/menu/menu.component"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { flags } from "App/feature-flags"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { SynchronizationState } from "App/data-sync/reducers"
import { ReduxRootState } from "Renderer/store"
import { DeviceState } from "App/device"

jest.mock("App/feature-flags")

type Props = ComponentProps<typeof Menu>

const initialStateMock = {} as unknown as ReduxRootState

const defaultProps: Props = {
  syncState: SynchronizationState.Empty,
}

const render = (initialState?: ReduxRootState, extraProps?: Partial<Props>) => {
  const storeMock = createMockStore([thunk])({
    ...initialStateMock,
    ...initialState,
  })

  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Provider store={storeMock}>
      <Router history={history}>
        <Menu {...props} />
      </Router>
    </Provider>
  )
}

describe("Device: Mudita pure", () => {
  test("matches snapshot", () => {
    jest.spyOn(flags, "get").mockReturnValue(true)
    const { container } = render({
      ...initialStateMock,
      device: {
        deviceType: DeviceType.MuditaPure,
      } as unknown as DeviceState,
    })
    expect(container).toMatchSnapshot()
  })

  test("should show sync state if not loaded yet", () => {
    jest.spyOn(flags, "get").mockReturnValue(true)
    const { getByTestId } = render(
      {
        ...initialStateMock,
        device: {
          deviceType: DeviceType.MuditaPure,
        } as unknown as DeviceState,
      },
      { syncState: SynchronizationState.Cache }
    )
    expect(getByTestId(MenuGroupTestIds.Sync)).toBeInTheDocument()
  })
})

describe("Device: Mudita harmony", () => {
  test("matches snapshot", () => {
    jest.spyOn(flags, "get").mockReturnValue(true)
    const { container } = render({
      ...initialStateMock,
      device: {
        deviceType: DeviceType.MuditaHarmony,
      } as unknown as DeviceState,
    })
    expect(container).toMatchSnapshot()
  })
})

test("Menu should have overview item", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)
  const { getByTestId } = render({
    ...initialStateMock,
    device: {
      deviceType: DeviceType.MuditaHarmony,
    } as unknown as DeviceState,
  })
  expect(getByTestId(MenuGroupTestIds.Help)).toHaveTextContent(
    "[value] module.help"
  )
})
