/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * @jest-environment jsdom
 */

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { AppSettings } from "app-settings/renderer"
import { UsbAccessFlow } from "./usb-access-flow"
import { useGrantAccessToSerialPort } from "./use-usb-access"
import { useUsbAccessStatus } from "./use-usb-access-status"

jest.mock("app-settings/renderer", () => ({
  AppSettings: {
    set: jest.fn(),
  },
}))

jest.mock("./use-usb-access", () => ({
  useGrantAccessToSerialPort: jest.fn(),
}))

jest.mock("./use-usb-access-status", () => ({
  useUsbAccessStatus: jest.fn(),
}))

jest.mock("app-init/ui", () => {
  const React = require("react")

  const modal =
    (testId: string) =>
    ({
      opened,
      onAction,
      onClose,
    }: {
      opened: boolean
      onAction?: VoidFunction
      onClose?: VoidFunction
    }) => {
      if (!opened) {
        return null
      }

      return React.createElement(
        "div",
        { "data-testid": testId },
        React.createElement(
          "button",
          {
            "data-testid": `${testId}-action`,
            onClick: onAction,
          },
          "action"
        ),
        React.createElement(
          "button",
          {
            "data-testid": `${testId}-close`,
            onClick: onClose,
          },
          "close"
        )
      )
    }

  return {
    UsbAccessGrantedModal: modal("usb-access-granted"),
    UsbAccessPromptFailureModal: ({
      opened,
      variant,
      onAction,
      onClose,
    }: {
      opened: boolean
      variant: string
      onAction: (suppressPromptFailureModal: boolean) => void
      onClose: VoidFunction
    }) => {
      if (!opened) {
        return null
      }

      return React.createElement(
        "div",
        {
          "data-testid": "usb-access-prompt-failure",
          "data-variant": variant,
        },
        React.createElement("input", {
          "data-testid": "usb-access-prompt-failure-checkbox",
          type: "checkbox",
        }),
        React.createElement(
          "button",
          {
            "data-testid": "usb-access-prompt-failure-action",
            onClick: () => onAction(true),
          },
          "action"
        ),
        React.createElement(
          "button",
          {
            "data-testid": "usb-access-prompt-failure-close",
            onClick: onClose,
          },
          "close"
        )
      )
    },
    UsbAccessProcessingModal: ({ opened }: { opened: boolean }) =>
      opened
        ? React.createElement("div", {
            "data-testid": "usb-access-processing",
          })
        : null,
    UsbAccessRequestCancelledModal: modal("usb-access-cancelled"),
    UsbAccessRequestModal: modal("usb-access-request"),
    UsbAccessRestartRequiredModal: modal("usb-access-restart-required"),
  }
})

const mockUseUsbAccessStatus = useUsbAccessStatus as jest.Mock
const mockUseGrantAccessToSerialPort = useGrantAccessToSerialPort as jest.Mock
const mockAppSettingsSet = AppSettings.set as jest.Mock

const defaultStatus = {
  isLoading: false,
  isError: false,
  hasAccess: false,
  restartRequired: false,
  promptFailureSuppressed: false,
}

describe("UsbAccessFlow", () => {
  const onClose = jest.fn()
  const grantAccessToSerialPort = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    mockUseUsbAccessStatus.mockReturnValue(defaultStatus)
    mockUseGrantAccessToSerialPort.mockReturnValue({
      mutateAsync: grantAccessToSerialPort,
    })
    mockAppSettingsSet.mockResolvedValue({})
  })

  it("does not open USB access modals when flow is closed", () => {
    render(<UsbAccessFlow opened={false} onClose={onClose} />)

    expect(screen.queryByTestId("usb-access-request")).toBeNull()
    expect(screen.queryByTestId("usb-access-granted")).toBeNull()
    expect(screen.queryByTestId("usb-access-cancelled")).toBeNull()
    expect(screen.queryByTestId("usb-access-restart-required")).toBeNull()
  })

  it("opens request modal when access is missing and restart is not required", async () => {
    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    expect(await screen.findByTestId("usb-access-request")).not.toBeNull()
  })

  it("shows processing and then granted modal after successful grant", async () => {
    let resolveGrant: (value: { ok: true; data: object }) => void = () => {
      throw new Error("grant promise resolver was not initialized")
    }
    grantAccessToSerialPort.mockReturnValue(
      new Promise((resolve) => {
        resolveGrant = resolve
      })
    )

    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    fireEvent.click(await screen.findByTestId("usb-access-request-action"))

    expect(screen.getByTestId("usb-access-processing")).not.toBeNull()

    await act(async () => {
      resolveGrant({ ok: true, data: {} })
    })

    await waitFor(() => {
      expect(mockAppSettingsSet).toHaveBeenCalledWith({
        system: { restartRequiredForSerialPortAccess: true },
      })
    })
    expect(screen.getByTestId("usb-access-granted")).not.toBeNull()
  })

  it("opens cancelled modal after failed grant", async () => {
    grantAccessToSerialPort.mockResolvedValue({ ok: false, error: new Error() })

    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    fireEvent.click(await screen.findByTestId("usb-access-request-action"))

    expect(await screen.findByTestId("usb-access-cancelled")).not.toBeNull()
    expect(mockAppSettingsSet).not.toHaveBeenCalled()
  })

  it("opens prompt failure modal when authorization prompt is unavailable", async () => {
    grantAccessToSerialPort.mockResolvedValue({
      ok: false,
      error: { name: "AuthorizationPromptUnavailable" },
    })

    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    fireEvent.click(await screen.findByTestId("usb-access-request-action"))

    expect(
      (await screen.findByTestId("usb-access-prompt-failure")).getAttribute(
        "data-variant"
      )
    ).toBe("authorizationPromptUnavailable")
    expect(screen.queryByTestId("usb-access-cancelled")).toBeNull()
  })

  it("opens prompt failure modal when serial port groups are not found", async () => {
    grantAccessToSerialPort.mockResolvedValue({
      ok: false,
      error: { name: "SerialPortGroupsNotFound" },
    })

    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    fireEvent.click(await screen.findByTestId("usb-access-request-action"))

    expect(
      (await screen.findByTestId("usb-access-prompt-failure")).getAttribute(
        "data-variant"
      )
    ).toBe("serialPortGroupsNotFound")
    expect(screen.queryByTestId("usb-access-cancelled")).toBeNull()
  })

  it("stores prompt failure suppression when user opts out", async () => {
    grantAccessToSerialPort.mockResolvedValue({
      ok: false,
      error: { name: "AuthorizationPromptUnavailable" },
    })

    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    fireEvent.click(await screen.findByTestId("usb-access-request-action"))
    fireEvent.click(
      await screen.findByTestId("usb-access-prompt-failure-action")
    )

    await waitFor(() => {
      expect(mockAppSettingsSet).toHaveBeenCalledWith({
        system: { suppressUsbAccessPromptFailureModal: true },
      })
    })
    expect(onClose).toHaveBeenCalled()
  })

  it("opens restart-required modal and clears restart flag on action", async () => {
    mockUseUsbAccessStatus.mockReturnValue({
      ...defaultStatus,
      restartRequired: true,
    })

    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    fireEvent.click(
      await screen.findByTestId("usb-access-restart-required-action")
    )

    await waitFor(() => {
      expect(mockAppSettingsSet).toHaveBeenCalledWith({
        system: { restartRequiredForSerialPortAccess: false },
      })
    })
    expect(onClose).toHaveBeenCalled()
  })

  it("does not open USB access modals when access is already available", () => {
    mockUseUsbAccessStatus.mockReturnValue({
      ...defaultStatus,
      hasAccess: true,
    })

    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    expect(screen.queryByTestId("usb-access-request")).toBeNull()
    expect(screen.queryByTestId("usb-access-granted")).toBeNull()
    expect(screen.queryByTestId("usb-access-cancelled")).toBeNull()
    expect(screen.queryByTestId("usb-access-restart-required")).toBeNull()
  })

  it("does not open USB access modals when prompt failure was suppressed", () => {
    mockUseUsbAccessStatus.mockReturnValue({
      ...defaultStatus,
      promptFailureSuppressed: true,
    })

    render(<UsbAccessFlow opened={true} onClose={onClose} />)

    expect(screen.queryByTestId("usb-access-request")).toBeNull()
    expect(screen.queryByTestId("usb-access-prompt-failure")).toBeNull()
  })
})
