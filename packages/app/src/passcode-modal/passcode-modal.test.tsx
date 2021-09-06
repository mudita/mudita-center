/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import PasscodeModal from "./passcode-modal.component"
import React, { ComponentProps } from "react"
import { PasscodeModalTestIds } from "./passcode-modal-test-ids.enum"
import { fireEvent, waitFor } from "@testing-library/dom"
import { InputTextTestIds } from "App/renderer/components/core/input-text/input-text-test-ids.enum"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { noop } from "Renderer/utils/noop"

type Props = ComponentProps<typeof PasscodeModal>

const defaultProps: Props = {
  openModal: true,
  close: jest.fn(),
  openBlocked: undefined
}

const renderer = (extraProps?: Partial<Props>) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }
  const modal = renderWithThemeAndIntl(<PasscodeModal {...props} />)
  return {
    ...modal,
    inputsContainer: () =>
      modal.queryByTestId(PasscodeModalTestIds.PasscodeInputs),
    inputsList: () => modal.queryAllByTestId(InputTextTestIds.PasswordInput),
    errorMessage: () => modal.queryByTestId(PasscodeModalTestIds.ErrorMessage),
  }
}

test("Passcode modal has 4 inputs", () => {
  const { inputsContainer } = renderer()
  expect(inputsContainer()?.childNodes).toHaveLength(4)
})

test("Passcode inputs are disabled when filled", () => {
  const { inputsList } = renderer()
  fireEvent.change(inputsList()[0] as Element, { target: { value: "2" } })
  expect(inputsList()[0]).toHaveProperty("disabled")
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")
})

test("Show typing error message", async () => {
  const { inputsList, errorMessage } = renderer()
  fireEvent.keyDown(inputsList()[0] as Element, {
    key: "a",
    code: "a",
    keyCode: 97,
    charCode: 97,
  })
  await waitFor(() =>
    expect(errorMessage()).toHaveTextContent(
      "[value] component.passcodeModalErrorTyping"
    )
  )
})

test("message is displayed properly when request about phone lock return internal server error", async () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.UnlockDevice]: Promise.resolve({
      status: DeviceResponseStatus.InternalServerError,
    }),
  }
  const { inputsList, errorMessage } = renderer()
  fireEvent.change(inputsList()[0] as Element, { target: { value: "2" } })
  fireEvent.change(inputsList()[1] as Element, { target: { value: "2" } })
  fireEvent.change(inputsList()[2] as Element, { target: { value: "2" } })
  fireEvent.change(inputsList()[3] as Element, { target: { value: "2" } })
  await waitFor(() =>
    expect(errorMessage()).toHaveTextContent(
      "[value] component.passcodeModalTryAgain"
    )
  )
})

test("message is displayed properly when request about phone lock status return phone locked", async () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.UnlockDevice]: Promise.resolve({
      status: DeviceResponseStatus.Ok,
    }),
    [IpcRequest.GetUnlockDeviceStatus]: Promise.resolve({
      status: DeviceResponseStatus.PhoneLocked,
    }),
  }
  const { inputsList, errorMessage } = renderer()
  fireEvent.change(inputsList()[0] as Element, { target: { value: "2" } })
  fireEvent.change(inputsList()[1] as Element, { target: { value: "2" } })
  fireEvent.change(inputsList()[2] as Element, { target: { value: "2" } })
  fireEvent.change(inputsList()[3] as Element, { target: { value: "2" } })
  await waitFor(noop)
  await waitFor(() =>
    expect(errorMessage()).toHaveTextContent(
      "[value] component.passcodeModalError"
    )
  )
})
