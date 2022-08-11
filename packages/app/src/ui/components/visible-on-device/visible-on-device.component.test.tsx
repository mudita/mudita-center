/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DeviceType } from "@mudita/pure"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { VisibleOnDevice } from "App/ui/components/visible-on-device/visible-on-device.component"

const render = (
  props: ComponentProps<typeof VisibleOnDevice>,
  state?: ReduxRootState
) => {
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <VisibleOnDevice {...props} />
    </Provider>
  )
}

const TestComponent = () => <h1>Hello World!</h1>

test("renders component if it's available for current device", () => {
  const { getByText } = render(
    {
      devices: [DeviceType.MuditaPure],
      children: <TestComponent />,
    },
    {
      device: {
        deviceType: DeviceType.MuditaPure,
      },
    } as ReduxRootState
  )

  expect(getByText("Hello World!")).toBeInTheDocument()
})

test("not render component if it's not available for current device", () => {
  const { queryByText } = render(
    {
      devices: [DeviceType.MuditaHarmony],
      children: <TestComponent />,
    },
    {
      device: {
        deviceType: DeviceType.MuditaPure,
      },
    } as ReduxRootState
  )

  expect(queryByText("Hello World!")).not.toBeInTheDocument()
})
