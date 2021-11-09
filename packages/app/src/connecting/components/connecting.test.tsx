/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Connecting from "App/connecting/components/connecting.component"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { PasscodeLockedTestIds } from "App/passcode-modal/components/PasscodeLocked/passcode-locked-test-ids.enum"
import { ErrorConnectingModalTestIds } from "App/connecting/components/error-connecting-modal-test-ids.enum"
import { act } from "@testing-library/react"

jest.mock("App/connecting/requests/register-first-phone-connection")

type Props = ComponentProps<typeof Connecting>

const defaultProps: Props = {
  initialModalsShowed: false,
  loaded: false,
  locked: false,
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
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("when component is render with default props", () => {
    test("`PasscodeLocked` component isn't displayed ", () => {
      const { queryByTestId } = render()
        expect(queryByTestId(PasscodeLockedTestIds.Container)).not.toBeInTheDocument()
    })

    test("`ErrorConnectingModal` component isn't displayed ", () => {
      const { queryByTestId } = render()
        expect(queryByTestId(ErrorConnectingModalTestIds.Container)).not.toBeInTheDocument()
    })

    test("`ErrorConnectingModal` is displayed if timeout pass ", () => {
      const { queryByTestId } = render()
      act(() => {
        jest.runAllTimers();
      });
        expect(queryByTestId(ErrorConnectingModalTestIds.Container)).toBeInTheDocument()
    })
  })
})
