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
import Menu from "App/__deprecated__/renderer/components/rest/menu/menu.component"
import history from "App/__deprecated__/renderer/routes/history"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { flags } from "App/feature-flags"
import { MenuGroupTestIds } from "App/__deprecated__/renderer/components/rest/menu/menu-group-test-ids.enum"
import { SynchronizationState } from "App/data-sync/reducers"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { DeviceState } from "App/device"
import { MessagesState } from "App/messages/reducers"
import { NotificationBadgeTestIds } from "App/notification/components"
import { MessageType } from "App/messages/constants"
import { Thread } from "App/messages/dto"

jest.mock("App/feature-flags")

type Props = ComponentProps<typeof Menu>

const defaultState = {
  device: {
    deviceType: DeviceType.MuditaPure,
  } as unknown as DeviceState,
  messages: {
    threadMap: {},
  },
} as unknown as ReduxRootState

const threadMock: Thread = {
  id: "1",
  lastUpdatedAt: new Date(1617089558 * 1000),
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  unread: true,
  phoneNumber: "123123123",
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}

const defaultProps: Props = {
  syncState: SynchronizationState.Empty,
}

const render = (
  extraState?: Partial<ReduxRootState>,
  extraProps?: Partial<Props>
) => {
  const storeMock = createMockStore([thunk])({
    ...defaultState,
    ...extraState,
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
  jest.spyOn(flags, "get").mockReturnValue(true)

  test("matches snapshot", () => {
    const { container } = render(defaultState)
    expect(container).toMatchSnapshot()
  })

  describe("Sync spinner functionality", () => {
    test("when `syncState` is set to `Empty` the spinner isn't visible", () => {
      const { queryByTestId } = render(defaultState, {
        syncState: SynchronizationState.Empty,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).not.toBeInTheDocument()
    })
    test("when `syncState` is set to `Loaded` the spinner isn't visible", () => {
      const { queryByTestId } = render(defaultState, {
        syncState: SynchronizationState.Loaded,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).not.toBeInTheDocument()
    })
    test("when `syncState` is set to `Cache` the spinner is visible", () => {
      const { queryByTestId } = render(defaultState, {
        syncState: SynchronizationState.Cache,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).toBeInTheDocument()
    })

    test("when `syncState` is set to `Loading` the spinner is visible", () => {
      const { queryByTestId } = render(defaultState, {
        syncState: SynchronizationState.Empty,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).not.toBeInTheDocument()
    })
  })

  test("shows notification badge when messages notifications present in state", () => {
    const { queryByTestId } = render(
      {
        ...defaultState,
        messages: {
          threadMap: {
            "1": threadMock,
          },
        } as unknown as MessagesState,
      },
      {
        deviceFeaturesVisible: true,
      }
    )
    expect(
      queryByTestId(NotificationBadgeTestIds.BadgeCircle)
    ).toBeInTheDocument()
  })
})

describe("Device: Mudita harmony", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)

  test("matches snapshot", () => {
    const { container } = render({
      ...defaultState,
      device: {
        deviceType: DeviceType.MuditaHarmony,
      } as unknown as DeviceState,
    })
    expect(container).toMatchSnapshot()
  })
})

test("Menu should have overview item", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)

  const { queryByTestId } = render({
    ...defaultState,
    device: {
      deviceType: DeviceType.MuditaHarmony,
    } as unknown as DeviceState,
  })
  expect(queryByTestId(MenuGroupTestIds.Help)).toHaveTextContent(
    "[value] module.help"
  )
})
