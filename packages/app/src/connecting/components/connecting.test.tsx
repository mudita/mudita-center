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
import { ErrorSyncModalTestIds } from "App/connecting/components/error-sync-modal/error-sync-modal-test-ids.enum"
import { SynchronizationState } from "App/data-sync/reducers"
import { DeviceType } from "@mudita/pure"

jest.mock("App/connecting/requests/register-first-phone-connection")

type Props = ComponentProps<typeof Connecting>

const defaultProps: Props = {
  loaded: false,
  deviceType: DeviceType.MuditaPure,
  unlocked: null,
  phoneLockTime: undefined,
  getUnlockStatus: jest.fn().mockReturnValue({
    payload: DeviceResponseStatus.Ok,
  }),
  unlockDevice: jest.fn().mockReturnValue({
    payload: DeviceResponseStatus.Ok,
  }),
  noModalsVisible: true,
  syncInitialized: false,
  syncState: SynchronizationState.Empty,
  updateAllIndexes: jest.fn(),
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

    test("`ErrorSyncModal` component isn't displayed ", () => {
      const { queryByTestId } = render()
      expect(
        queryByTestId(ErrorSyncModalTestIds.Container)
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

  describe("when `noModalsVisible` is set to `false`", () => {
    const extraProps: Partial<Props> = {
      noModalsVisible: false,
    }
    test("`PasscodeLocked` component isn't displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(PasscodeModalTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `noModalsVisible` is set to `false` and unlocked to `false`", () => {
    const extraProps: Partial<Props> = {
      noModalsVisible: false,
      unlocked: false,
    }

    test("`PasscodeLocked` component isn't displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(PasscodeModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("`ErrorConnectingModal` component isn't displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("`ErrorSyncModal` component isn't displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(ErrorSyncModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("`ErrorConnectingModal` isn't displayed if timeout pass ", () => {
      const { queryByTestId } = render(extraProps)
      act(() => {
        jest.runAllTimers()
      })
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `syncInitialized` is set to `true` and `syncState` is set to Error", () => {
    const extraProps: Partial<Props> = {
      unlocked: true,
      syncState: SynchronizationState.Error,
    }

    test("`PasscodeLocked` component isn't displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(PasscodeModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("`ErrorConnectingModal` component isn't displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("`ErrorSyncModal` component is displayed ", () => {
      const { queryByTestId } = render(extraProps)
      expect(queryByTestId(ErrorSyncModalTestIds.Container)).toBeInTheDocument()
    })
  })
})
