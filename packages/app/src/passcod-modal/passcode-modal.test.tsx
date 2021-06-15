/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import PasscodeModal from "./passcode-modal.component"
import React from "react"
import { PasscodeModalTestIds } from "./passcode-modal-test-ids.enum"
import { fireEvent, waitFor } from "@testing-library/dom"
import { InputTextTestIds } from "App/renderer/components/core/input-text/input-text-test-ids.enum"

const defaultProps = {
  openModal: true,
  close: jest.fn(),
}
const renderer = () => {
  const props = {
    ...defaultProps,
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
