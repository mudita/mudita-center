/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { act } from "@testing-library/react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Connecting from "App/connecting/components/connecting.component"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { ErrorConnectingModalTestIds } from "App/connecting/components/error-connecting-modal-test-ids.enum"
import { PasscodeModalTestIds } from "App/passcode-modal/passcode-modal-test-ids.enum"

jest.mock("App/connecting/requests/register-first-phone-connection")

type Props = ComponentProps<typeof Connecting>

const defaultProps: Props = {
  initialModalsShowed: false,
  loaded: false,
  unlocked: null,
  phoneLockTime: undefined,
  getUnlockStatus: jest.fn().mockReturnValue({
    payload: DeviceResponseStatus.Ok,
  }),
  unlockDevice: jest.fn().mockReturnValue({
    payload: DeviceResponseStatus.Ok,
  }),
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<Connecting {...props} />)
  return {
    ...outcome,
  }
}

describe("`BackupDeviceFlow` component", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe("when component is render with default props", () => {
    test("`PasscodeLocked` component isn't displayed ", () => {
      const { queryByTestId } = render()
      expect(
        queryByTestId(PasscodeModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("`ErrorConnectingModal` component isn't displayed ", () => {
      const { queryByTestId } = render()
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("`ErrorConnectingModal` is displayed if timeout pass ", () => {
      const { queryByTestId } = render()
      act(() => {
        jest.runAllTimers()
      })
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).toBeInTheDocument()
    })
  })

  describe("when `initialModalsShowed` is set to true", () => {
    const extraProps: Partial<Props> = {
      initialModalsShowed: true,
    }
    test("`PasscodeLocked` component isn't displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(PasscodeModalTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `initialModalsShowed` is set to true and unlocked to `false`", () => {
    const extraProps: Partial<Props> = {
      initialModalsShowed: true,
      unlocked: false,
    }

    test("`PasscodeLocked` component is displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(queryByTestId(PasscodeModalTestIds.Container)).toBeInTheDocument()
    })

    test("`ErrorConnectingModal` component isn't displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("`ErrorConnectingModal` is displayed if timeout pass ", () => {
      const { queryByTestId } = render(extraProps)
      act(() => {
        jest.runAllTimers()
      })
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).toBeInTheDocument()
    })
  })
})
