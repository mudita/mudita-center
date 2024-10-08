/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import PasscodeModal from "./passcode-modal.component"
import React, { ComponentProps, KeyboardEvent } from "react"
import { PasscodeModalTestIds } from "./passcode-modal-test-ids.enum"
import { fireEvent, waitFor } from "@testing-library/dom"
import { cleanup } from "@testing-library/react"
import { InputTextTestIds } from "Core/__deprecated__/renderer/components/core/input-text/input-text-test-ids.enum"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { PasscodeLockedTestIds } from "Core/device-initialization/components/passcode-modal/passcode-locked-test-ids.enum"
import { flags } from "Core/feature-flags"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { ModalTestIds } from "Core/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { AppError } from "Core/core/errors"
import { PayloadAction } from "@reduxjs/toolkit"

jest.mock("Core/feature-flags")

type Props = ComponentProps<typeof PasscodeModal>

const defaultProps: Props = {
  openModal: true,
  canBeClosed: true,
  close: jest.fn(),
  leftTime: undefined,
  unlockDevice: jest.fn().mockReturnValue({
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

const F1KeyEvent = {
  key: "F1",
  code: "F1",
  keyCode: 112,
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

jest.mock("help/store", () => ({
  useHelpShortcut: () => jest.fn(),
}))

test("Passcode modal has 4 inputs", () => {
  const { inputsContainer } = renderer()
  expect(inputsContainer()?.childNodes).toHaveLength(4)
})

test("Passcode inputs are disabled when filled", () => {
  const { inputsList } = renderer()
  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  expect(inputsList()[0]).toBeDisabled()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")
})

test("Show typing error message when a latter is typed", async () => {
  const { inputsList, errorMessage } = renderer()
  fireEvent.keyDown(inputsList()[0] as Element, letterKeyEvent)
  await waitFor(() =>
    expect(errorMessage()).toHaveTextContent(
      "[value] component.passcodeModalErrorTyping"
    )
  )
})

test("Show typing error message when F1 is typed", async () => {
  const { inputsList, errorMessage } = renderer()
  fireEvent.keyDown(inputsList()[0] as Element, F1KeyEvent)
  await waitFor(() =>
    expect(errorMessage()).toHaveTextContent(
      "[value] component.passcodeModalErrorTyping"
    )
  )
})

test("Message is displayed properly when request about phone lock return internal server error", async () => {
  const { inputsList, errorMessage } = renderer({
    unlockDevice: jest.fn().mockReturnValue({
      error: new AppError("App Error", "I'm error"),
    } as PayloadAction<boolean, string, unknown, AppError>),
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

test.skip("Message is displayed properly when request about phone lock status return phone locked", async () => {
  const { inputsList, errorMessage } = renderer({
    unlockDevice: jest.fn().mockReturnValue(false),
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
  const { phoneLockedContainer } = renderer({ leftTime: 16308881830 })
  expect(phoneLockedContainer()).toBeInTheDocument()
})

test("Modal should not display close icon when has flag canBeClosed is set as false", () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(true)
  const { queryByTestId } = renderer({
    canBeClosed: false,
  })
  expect(queryByTestId(ModalTestIds.CloseButton)).not.toBeInTheDocument()
})

test("Modal should display close icon when has flag canBeClosed is set as true", () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(true)
  const { queryByTestId } = renderer({
    canBeClosed: true,
  })
  expect(queryByTestId(ModalTestIds.CloseButton)).toBeInTheDocument()
})

test("backspace key down event refresh previous input state to default", () => {
  const { inputsList } = renderer()
  expect(inputsList()[0]).toBeEnabled()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(inputsList()[0]).not.toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  expect(inputsList()[0]).toBeDisabled()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[1] as Element, backspaceKeyEvent)
  expect(inputsList()[0]).toBeEnabled()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(inputsList()[0]).not.toHaveStyleRule("background-color", "#f4f5f6")
})

test("pass digit value in input that with the same value move cursor to the next input", () => {
  const { inputsList } = renderer()
  expect(inputsList()[0]).toBeEnabled()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(inputsList()[0]).not.toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  expect(inputsList()[0]).toBeDisabled()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[1] as Element, backspaceKeyEvent)
  expect(inputsList()[0]).toBeEnabled()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(inputsList()[0]).not.toHaveStyleRule("background-color", "#f4f5f6")

  fireEvent.keyDown(inputsList()[0] as Element, digitKeyEvent)
  expect(inputsList()[0]).toBeDisabled()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(inputsList()[0]).toHaveStyleRule("background-color", "#f4f5f6")
})
