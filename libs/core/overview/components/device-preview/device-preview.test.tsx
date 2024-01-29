/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { fireEvent } from "@testing-library/dom"
import { CaseColour, DeviceType } from "Core/device/constants"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { DevicePreview } from "Core/overview/components/device-preview/device-preview.component"
import { DeviceTestIds } from "Core/overview/components/device-preview/device-preview-test-ids.enum"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

type Props = ComponentProps<typeof DevicePreview>

const defaultProps: Props = {
  onDisconnect: jest.fn(),
  deviceType: DeviceType.MuditaPure,
  caseColour: CaseColour.Gray,
}
const defaultState: ReduxRootState = {
  deviceManager: { devices: [{}, {}] }
} as unknown as ReduxRootState

const render = (extraProps?: Partial<Props>, extraState?: Partial<ReduxRootState>) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }
  const state: ReduxRootState = {
    ...defaultState,
    ...extraState,
  }
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <DevicePreview {...props} />
    </Provider>
  )
}

test("disconnect button works properly", () => {
  const onDisconnect = jest.fn()

  const { getByTestId } = render({ onDisconnect })

  fireEvent.click(getByTestId(DeviceTestIds.DisconnectButton))

  expect(onDisconnect).toHaveBeenCalled()
})

test("Phone Component should render proper phone color", () => {
  const { getByTestId } = render({ caseColour: CaseColour.Black })

  expect(getByTestId(DeviceTestIds.PureBlack)).toBeInTheDocument()
})
