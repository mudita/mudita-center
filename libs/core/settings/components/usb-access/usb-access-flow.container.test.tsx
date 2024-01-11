/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { fireEvent } from "@testing-library/dom"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import USBAccessFlowContainer from "./usb-access-flow.container"
import { UsbAccessFlowTestIds } from "Core/settings/components/usb-access/usb-access-flow-test-ids.enum"
import { ModalTestIds } from "Core/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { waitFor } from "@testing-library/react"
import { useDispatch } from "react-redux"
import { ModalsManagerEvent } from "Core/modals-manager/constants"

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}))

const dispatch = jest.fn()
const useDispatchMock = useDispatch as jest.Mock
useDispatchMock.mockImplementation(() => dispatch)

const defaultState = {
  settings: {
    usbAccessRestart: false,
  },
  modalsManager: {
    appForcedUpdateFlowShow: false,
    appUpdateFlowShow: false,
    contactSupportFlowShow: false,
    deviceInitializationFailedModalShow: false,
    appRunWithSudoShow: false,
    usbAccessFlowShow: false,
  },
} as ReduxRootState

const render = (state = defaultState) => {
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <USBAccessFlowContainer />
    </Provider>
  )
}

describe("USBAccessFlowContainer", () => {
  test("User allows to add his account to serial port group", async () => {
    const { queryByTestId, getByTestId } = render({
      settings: {
        usbAccessRestart: false,
      },
      modalsManager: {
        usbAccessFlowShow: true,
      },
    } as ReduxRootState)

    expect(
      queryByTestId(UsbAccessFlowTestIds.AllowUSBPortAccessModal)
    ).toBeInTheDocument()

    const actionButton = getByTestId(ModalTestIds.ModalActionButton)

    expect(actionButton).toBeInTheDocument()

    fireEvent.click(actionButton)

    await waitFor(() => {
      expect(
        queryByTestId(UsbAccessFlowTestIds.USBAccessGrantedModal)
      ).toBeInTheDocument()
    })
  })

  test("User refuses to add his account to serial port group", async () => {
    const { queryByTestId, getByTestId } = render({
      settings: {
        usbAccessRestart: false,
      },
    } as ReduxRootState)

    expect(
      queryByTestId(UsbAccessFlowTestIds.AllowUSBPortAccessModal)
    ).toBeInTheDocument()

    const closeButton = getByTestId(ModalTestIds.CloseButton)

    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(
        queryByTestId(UsbAccessFlowTestIds.CantConnectWithoutUSBPortAccessModal)
      ).toBeInTheDocument()
    })
  })

  test("User allowed for action, but didnt restart computer", async () => {
    const { queryByTestId, getByTestId } = render({
      settings: {
        usbAccessRestart: true,
      },
      modalsManager: {
        usbAccessFlowShow: true,
      },
    } as ReduxRootState)

    expect(
      queryByTestId(UsbAccessFlowTestIds.AllowUSBPortAccessModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UsbAccessFlowTestIds.RestartYourComputerToConnectModal)
    ).toBeInTheDocument()

    const actionButton = getByTestId(ModalTestIds.ModalActionButton)

    expect(actionButton).toBeInTheDocument()

    fireEvent.click(actionButton)

    await waitFor(() => {
      expect(useDispatchMock).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalledWith({
        payload: undefined,
        type: ModalsManagerEvent.HideModals,
      })
    })
  })
})
