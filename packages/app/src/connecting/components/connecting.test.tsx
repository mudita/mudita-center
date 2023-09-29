/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { act } from "@testing-library/react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Connecting from "App/connecting/components/connecting.component"
import { ErrorConnectingModalTestIds } from "App/connecting/components/error-connecting-modal-test-ids.enum"
import { PasscodeModalTestIds } from "App/__deprecated__/passcode-modal/passcode-modal-test-ids.enum"
import { ErrorSyncModalTestIds } from "App/connecting/components/error-sync-modal/error-sync-modal-test-ids.enum"
import { SynchronizationState } from "App/data-sync/reducers"
import { DeviceType } from "App/device/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { CriticalBatteryLevelModalTestIds } from "App/connecting/components/critical-battery-level-modal/critical-battery-level-modal-test-ids.enum"
import { Provider } from "react-redux"
import store from "App/__deprecated__/renderer/store"

jest.mock("App/connecting/requests/register-first-phone-connection")

type Props = ComponentProps<typeof Connecting>

const defaultProps: Props = {
  onboardingFinished: true,
  loaded: false,
  passcodeModalCloseable: true,
  deviceType: DeviceType.MuditaPure,
  unlocked: null,
  leftTime: undefined,
  getUnlockStatus: jest.fn().mockReturnValue({
    payload: RequestResponseStatus.Ok,
  }),
  unlockDevice: jest.fn().mockReturnValue({
    payload: RequestResponseStatus.Ok,
  }),
  noModalsVisible: true,
  syncInitialized: false,
  syncState: SynchronizationState.Empty,
  updateAllIndexes: jest.fn(),
  checkingForOsForceUpdate: false,
  forceOsUpdateFailed: false,
  criticalBatteryLevel: false,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(
    <Provider store={store}>
      <Connecting {...props} />
    </Provider>
  )
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

    test("`CriticalBatteryLevelModal` component isn't displayed ", () => {
      const { queryByTestId } = render()
      expect(
        queryByTestId(CriticalBatteryLevelModalTestIds.Container)
      ).not.toBeInTheDocument()
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

  describe("`CriticalBatteryLevelModal` and `PasscodeModal` components", () => {
    const cases = [
      {
        noModalsVisible: false,
        unlocked: false,
        criticalBatteryLevel: false,
      },
      {
        noModalsVisible: false,
        unlocked: true,
        criticalBatteryLevel: false,
      },
    ]

    test.each(cases)(
      "both, Passcode Modal and CriticalBatteryLevel are hidden",
      (props) => {
        const { queryByTestId } = render(props)
        expect(
          queryByTestId(PasscodeModalTestIds.Container)
        ).not.toBeInTheDocument()
        expect(
          queryByTestId(CriticalBatteryLevelModalTestIds.Container)
        ).not.toBeInTheDocument()
      }
    )

    test("when unlocked, noModalsVisible, criticalBatteryLevel are true then both modals are hidden", () => {
      const extraProps: Partial<Props> = {
        noModalsVisible: true,
        unlocked: true,
        criticalBatteryLevel: true,
      }
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(PasscodeModalTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(CriticalBatteryLevelModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("when unlocked and criticalBatteryLevel are false then Passcode modal is visible", () => {
      const extraProps: Partial<Props> = {
        noModalsVisible: true,
        unlocked: false,
        criticalBatteryLevel: false,
      }
      const { queryByTestId } = render(extraProps)
      expect(queryByTestId(PasscodeModalTestIds.Container)).toBeInTheDocument()
      expect(
        queryByTestId(CriticalBatteryLevelModalTestIds.Container)
      ).not.toBeInTheDocument()
    })

    test("when unlocked is false, but noModalsVisible and criticalBatteryLevel are true then CriticalBatteryModal is visible", () => {
      const extraProps: Partial<Props> = {
        noModalsVisible: true,
        unlocked: false,
        criticalBatteryLevel: true,
      }
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(PasscodeModalTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(CriticalBatteryLevelModalTestIds.Container)
      ).toBeInTheDocument()
    })
  })

  describe("when `noModalsVisible` is set to `false` and unlocked to `false`", () => {
    const extraProps: Partial<Props> = {
      noModalsVisible: false,
      unlocked: false,
    }

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
