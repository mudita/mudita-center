/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from "@testing-library/react"
import { RequirementStatus } from "../requirement-status.type"
import { useUsbAccessActionRequired } from "./use-usb-access-action-required"
import { useUsbAccessStatus } from "./use-usb-access-status"

jest.mock("electron-log/renderer", () => ({
  warn: jest.fn(),
}))

jest.mock("./use-usb-access-status", () => ({
  useUsbAccessStatus: jest.fn(),
}))

const mockUseUsbAccessStatus = useUsbAccessStatus as jest.Mock

const defaultStatus = {
  isLoading: false,
  isError: false,
  hasAccess: false,
  restartRequired: false,
  promptFailureSuppressed: false,
}

describe("useUsbAccessActionRequired", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockUseUsbAccessStatus.mockReturnValue(defaultStatus)
  })

  it("does not require action when prompt failure was suppressed", async () => {
    mockUseUsbAccessStatus.mockReturnValue({
      ...defaultStatus,
      promptFailureSuppressed: true,
    })

    const { result } = renderHook(() => useUsbAccessActionRequired())

    await waitFor(() => {
      expect(result.current).toBe(RequirementStatus.ActionNotRequired)
    })
  })
})
