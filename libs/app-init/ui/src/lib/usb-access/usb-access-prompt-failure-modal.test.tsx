/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * @jest-environment jsdom
 */

import { type ChangeEventHandler, type PropsWithChildren } from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { UsbAccessPromptFailureModal } from "./usb-access-prompt-failure-modal"

jest.mock("react-intl", () => ({
  defineMessages: (messages: object) => messages,
}))

jest.mock("app-localize/utils", () => ({
  formatMessage: ({ id }: { id: string }) => id,
}))

jest.mock("app-theme/ui", () => {
  const React = require("react")

  return {
    Button: ({
      children,
      onClick,
    }: PropsWithChildren<{ onClick: VoidFunction }>) =>
      React.createElement("button", { onClick }, children),
    Checkbox: ({
      checked,
      children,
      onChange,
    }: PropsWithChildren<{
      checked: boolean
      onChange: ChangeEventHandler<HTMLInputElement>
    }>) =>
      React.createElement(
        "label",
        null,
        React.createElement("input", {
          checked,
          onChange,
          type: "checkbox",
        }),
        children
      ),
    CloseVariant: { Icon: "Icon" },
    GenericInfoModal: ({
      children,
      onClose,
      opened,
    }: PropsWithChildren<{ onClose: VoidFunction; opened: boolean }>) =>
      opened
        ? React.createElement(
            "div",
            null,
            children,
            React.createElement(
              "button",
              { onClick: onClose },
              "general.close"
            )
          )
        : null,
    Modal: {
      Buttons: ({ children }: PropsWithChildren) =>
        React.createElement("div", null, children),
    },
  }
})

describe("UsbAccessPromptFailureModal", () => {
  it("resets suppress checkbox state when modal is closed", () => {
    const onAction = jest.fn()
    const onClose = jest.fn()
    const { rerender } = render(
      <UsbAccessPromptFailureModal
        opened={true}
        variant="authorizationPromptUnavailable"
        onClose={onClose}
        onAction={onAction}
      />
    )

    fireEvent.click(
      screen.getByLabelText(
        "general.usbAccess.promptFailureModal.checkboxText"
      )
    )
    fireEvent.click(screen.getByText("general.close"))

    expect(onClose).toHaveBeenCalled()

    rerender(
      <UsbAccessPromptFailureModal
        opened={true}
        variant="authorizationPromptUnavailable"
        onClose={onClose}
        onAction={onAction}
      />
    )

    fireEvent.click(
      screen.getByText("general.usbAccess.promptFailureModal.buttonText")
    )

    expect(onAction).toHaveBeenCalledWith(false)
  })
})
