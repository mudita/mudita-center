/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "App/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { HarmonyOverview } from "App/overview/components/overview-screens/harmony-overview/harmony-overview.component"
import { UpdatingState } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import * as UpdatingForceModalFlowModule from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { UpdatingForceModalFlowProps } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.interface"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"
import { flags } from "App/feature-flags"

jest.mock("App/feature-flags")

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

type Props = ComponentProps<typeof HarmonyOverview>

const defaultProps: Props = {
  lowestSupportedOsVersion: "",
  lastAvailableOsVersion: "",
  batteryLevel: undefined,
  osVersion: "1.0.0",
  pureOsDownloaded: false,
  updatingState: UpdatingState.Standby,
  serialNumber: undefined,
  startUpdateOs: jest.fn(),
  setUpdateState: jest.fn(),
  updatePhoneOsInfo: jest.fn(),
  disconnectDevice: jest.fn(),
  openContactSupportFlow: jest.fn(),
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <HarmonyOverview {...props} />
    </Provider>
  )
}

test("Renders Mudita harmony data", () => {
  const { getByTestId, queryByTestId, queryByText } = render()

  expect(getByTestId(StatusTestIds.BatteryLevel)).toHaveTextContent("0 %")
  expect(queryByTestId(StatusTestIds.NetworkName)).not.toBeInTheDocument()
  queryByText(intl.formatMessage({ id: "module.overview.statusHarmonyTitle" }))
  expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent("1.0.0")
})

describe("update state", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)

  type TestCase = [
    updatingStateKeyValue: keyof typeof UpdatingState | undefined, // passing as key to improve test title readability
    isOsSupported: boolean,
    updatingForceModalState: UpdatingForceModalFlowState
  ]

  const testCases: TestCase[] = [
    ["Success", true, UpdatingForceModalFlowState.Success],
    ["Fail", true, UpdatingForceModalFlowState.Fail],
    ["Updating", true, UpdatingForceModalFlowState.Updating],
    ["Updating", false, UpdatingForceModalFlowState.Updating],
    [undefined, false, UpdatingForceModalFlowState.Info],
  ]

  let updateForceModalSpy: jest.SpyInstance<
    unknown,
    UpdatingForceModalFlowProps[]
  >

  beforeEach(() => {
    updateForceModalSpy = jest.spyOn(UpdatingForceModalFlowModule, "default")
  })

  describe.each(testCases)(
    "when updating state from store equals to %p and os support state equal to %p",
    (updatingStateKeyValue, isOsSupported, updatingForceModalState) => {
      test(`update force modal should receive ${updatingForceModalState}`, () => {
        const updatingState = updatingStateKeyValue
          ? UpdatingState[updatingStateKeyValue]
          : undefined

        if (isOsSupported) {
          render({
            osVersion: "1.1.0",
            lowestSupportedOsVersion: "1.0.0",
            updatingState,
          })
        } else {
          render({
            updatingState,
            osVersion: "0.1.0",
            lowestSupportedOsVersion: "1.0.0",
          })
        }

        expect(updateForceModalSpy).toHaveBeenLastCalledWith(
          expect.objectContaining({
            state: updatingForceModalState,
          }),
          expect.anything()
        )
      })
    }
  )
})
