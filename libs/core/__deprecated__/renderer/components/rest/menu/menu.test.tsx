/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import React from "react"
import { Provider } from "react-redux"
import { DeviceType } from "device-protocol/models"
import { CoreDeviceState } from "core-device/models"
import { DeviceManagerState } from "device-manager/models"
import Menu, {
  MenuProps,
} from "Core/__deprecated__/renderer/components/rest/menu/menu.component"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { MenuGroupTestIds } from "Core/__deprecated__/renderer/components/rest/menu/menu-group-test-ids.enum"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceState } from "Core/device"
import { MessagesState } from "Core/messages/reducers"
import { NotificationBadgeTestIds } from "Core/notification/components"
import { MessageType } from "Core/messages/constants"
import { Thread } from "Core/messages/dto"
import { View } from "Core/__deprecated__/renderer/constants/views"
import {
  DeviceInitializationState,
  DeviceInitializationStatus,
} from "Core/device-initialization/reducers/device-initialization.interface"
import { ActiveDeviceRegistryState } from "active-device-registry/models"

jest.mock("Core/settings/store/schemas/generate-application-id", () => ({
  generateApplicationId: () => "123",
}))

jest.mock("Core/feature-flags")

type Props = MenuProps

const defaultState = {
  device: {
    deviceType: DeviceType.MuditaPure,
  } as unknown as DeviceState,
  deviceManager: {} as unknown as DeviceManagerState,
  activeDeviceRegistry: {
    activeDeviceId: undefined,
  } as unknown as ActiveDeviceRegistryState,
  coreDevice: {
    devices: [],
  } as unknown as CoreDeviceState,
  deviceInitialization: {
    deviceInitializationStatus: DeviceInitializationStatus.Idle,
  } as unknown as DeviceInitializationState,
  messages: {
    data: { threadMap: {} },
  },
  genericViews: {
    menu: [],
    devices: [],
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
  deviceType: null,
  notifications: {
    [View.Messages]: false,
  },
  dataSyncInProgress: false,
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
      <Menu {...props} />
    </Provider>
  )
}

describe("Device: Mudita pure", () => {
  beforeAll(() => {
    process.env.NEW_HELP_ENABLED = "1"
  })

  afterAll(() => {
    delete process.env.NEW_HELP_ENABLED
  })

  test("matches snapshot", () => {
    const { container } = render(defaultState)
    expect(container).toMatchSnapshot()
  })

  describe("Sync spinner functionality", () => {
    test("when `dataSyncInProgress` is set to `true` the spinner is visible", () => {
      const { queryByTestId } = render(defaultState, {
        dataSyncInProgress: true,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).toBeInTheDocument()
    })

    test("when `dataSyncInProgress` is set to `false` the spinner is not visible", () => {
      const { queryByTestId } = render(defaultState, {
        dataSyncInProgress: false,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).not.toBeInTheDocument()
    })
  })

  test("shows notification badge when messages notifications present in state", () => {
    const { queryByTestId } = render(
      {
        ...defaultState,
        messages: {
          data: {
            ...defaultState.messages.data,
            threadMap: {
              "1": threadMock,
            },
          },
        } as unknown as MessagesState,
        coreDevice: {
          devices: [
            {
              id: "1",
              serialNumber: "1",
              deviceType: DeviceType.MuditaPure,
              caseColour: undefined,
            },
          ],
        } as unknown as CoreDeviceState,
        activeDeviceRegistry: {
          activeDeviceId: undefined,
        } as unknown as ActiveDeviceRegistryState,
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
