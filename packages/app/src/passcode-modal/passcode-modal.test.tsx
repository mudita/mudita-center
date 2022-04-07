/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import PasscodeModal from "./passcode-modal.component"
import React, { ComponentProps, KeyboardEvent } from "react"
import { PasscodeModalTestIds } from "./passcode-modal-test-ids.enum"
import { fireEvent, waitFor } from "@testing-library/dom"
import { cleanup } from "@testing-library/react"
import { InputTextTestIds } from "App/renderer/components/core/input-text/input-text-test-ids.enum"
import { noop } from "Renderer/utils/noop"
import { PasscodeLockedTestIds } from "App/passcode-modal/components/PasscodeLocked/passcode-locked-test-ids.enum"
import { flags } from "App/feature-flags"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/feature-flags")

type Props = ComponentProps<typeof PasscodeModal>

const defaultProps: Props = {
  openModal: true,
  close: jest.fn(),
  openBlocked: undefined,
  unlockDevice: jest.fn().mockReturnValue({
    payload: RequestResponseStatus.Ok,
  }),
  getUnlockStatus: jest.fn().mockReturnValue({
    payload: RequestResponseStatus.Ok,
  }),
}

const digitKeyEvent = {
  key: "2",
  code: "Digit2",
  keyCode: 50,
  charCode: 0,
} as KeyboardEvent

const letterKeyEvent = {
  key: "a",
  code: "a",
  keyCode: 97,
  charCode: 0,
} as KeyboardEvent

const backspaceKeyEvent = {
  key: "Backspace",
  code: "Backspace",
  keyCode: 8,
  charCode: 0,
} as KeyboardEvent

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
    inputsList: () => modal.queryAllByTestId(InputTextTestIds.PasscodeInput),
    errorMessage: () => modal.queryByTestId(PasscodeModalTestIds.ErrorMessage),
    phoneLockedContainer: () =>
      modal.queryByTestId(PasscodeLockedTestIds.Container),
  }
}

afterEach(() => {
  cleanup()
})

test("Passcode modal has 4 inputs", () => {
  const { inputsContainer } = renderer()
  expect(inputsContainer()?.childNodes).toHaveLength(4)
})

test("Passcode inputs are disabled when filled", () => {
  const { inputsList } = renderer()
  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  expect(inputsList()[0]).toBeDisabled()
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")
})

test("Show typing error message", async () => {
  const { inputsList, errorMessage } = renderer()
  fireEvent.keyDown(inputsList()[0] as Element, letterKeyEvent)
  await waitFor(() =>
    expect(errorMessage()).toHaveTextContent(
      "[value] component.passcodeModalErrorTyping"
    )
  )
})

test("Message is displayed properly when request about phone lock return internal server error", async () => {
  const { inputsList, errorMessage } = renderer({
    unlockDevice: jest.fn().mockReturnValue({
      payload: RequestResponseStatus.InternalServerError,
    }),
  })
  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)

  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  fireEvent.keyDown(inputsList()[1] as Element, digitKeyEvent)
  fireEvent.keyDown(inputsList()[2] as Element, digitKeyEvent)
  fireEvent.keyDown(inputsList()[3] as Element, digitKeyEvent)
  await waitFor(() =>
    expect(errorMessage()).toHaveTextContent(
      "[value] component.passcodeModalTryAgain"
    )
  )
})

test("Message is displayed properly when request about phone lock status return phone locked", async () => {
  const { inputsList, errorMessage } = renderer({
    getUnlockStatus: jest.fn().mockReturnValue({
      status: RequestResponseStatus.PhoneLocked,
    }),
  })
  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  fireEvent.keyDown(inputsList()[1] as Element, digitKeyEvent)
  fireEvent.keyDown(inputsList()[2] as Element, digitKeyEvent)
  fireEvent.keyDown(inputsList()[3] as Element, digitKeyEvent)
  await waitFor(noop)
  await waitFor(() =>
    expect(errorMessage()).toHaveTextContent(
      "[value] component.passcodeModalError"
    )
  )
})

test("Modal should show phoneLocked info when phone have time block", () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(true)
  const { phoneLockedContainer } = renderer({ openBlocked: 16308881830 })
  expect(phoneLockedContainer()).toBeInTheDocument()
})

test("backspace key down event refresh previous input state to default", () => {
  const { inputsList } = renderer()
  expect(inputsList()[0]).toBeEnabled()
  expect(inputsList()[0]).not.toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  expect(inputsList()[0]).toBeDisabled()
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[1] as Element, backspaceKeyEvent)
  expect(inputsList()[0]).toBeEnabled()
  expect(inputsList()[0]).not.toHaveStyleRule("background-color", "#f4f5f6")
})

test("pass digit value in input that with the same value move cursor to the next input", () => {
  const { inputsList } = renderer()
  expect(inputsList()[0]).toBeEnabled()
  expect(inputsList()[0]).not.toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  expect(inputsList()[0]).toBeDisabled()
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[1] as Element, backspaceKeyEvent)
  expect(inputsList()[0]).toBeEnabled()
  expect(inputsList()[0]).not.toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  expect(inputsList()[0]).toBeDisabled()
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")
})
