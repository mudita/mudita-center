/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { EULAAgreement } from "App/eula-agreement/components/eula-agreement/eula-agreement.component"
import { AgreementModalIds } from "App/eula-agreement/components/agreement-modal/agreement-modal-test-ids.enum"
import { DeviceState } from "App/device"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

const defaultState = {
  device: {
    status: {
      onboardingFinished: false,
    },
  } as unknown as DeviceState,
} as unknown as ReduxRootState

beforeEach(() => {
  jest.clearAllMocks()
})

const render = (extraState?: Partial<ReduxRootState>) => {
  const storeMock = createMockStore([thunk])({
    ...defaultState,
    ...extraState,
  })

  return renderWithThemeAndIntl(
    <Provider store={storeMock}>
      <EULAAgreement>
        <h1>TEST CONTENT</h1>
      </EULAAgreement>
    </Provider>
  )
}

test("Renders only child element if `onboardingFinished` flag in device state equal to `true`", () => {
  const { queryByTestId, getByText } = render({
    ...defaultState,
    device: {
      ...defaultState.device,
      status: {
        ...defaultState.device.status,
        onboardingFinished: true,
      },
    },
  })

  expect(getByText("TEST CONTENT")).toBeInTheDocument()
  expect(queryByTestId(AgreementModalIds.Modal)).not.toBeInTheDocument()
})

test("Renders child element and `AgreementModal` if `onboardingFinished` flag in device state equal to `false`", () => {
  const { queryByTestId, getByText } = render({
    ...defaultState,
    device: {
      ...defaultState.device,
      status: {
        ...defaultState.device.status,
        onboardingFinished: false,
      },
    },
  })

  expect(getByText("TEST CONTENT")).toBeInTheDocument()
  expect(queryByTestId(AgreementModalIds.Modal)).toBeInTheDocument()
})
