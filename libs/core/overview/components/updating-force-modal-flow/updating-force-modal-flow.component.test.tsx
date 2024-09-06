/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Provider } from "react-redux"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { State } from "Core/core/constants"
import { AppError } from "Core/core/errors"
import { DeviceType } from "device-protocol/models"
import { UpdatingForceModalFlowTestIds } from "Core/overview/components/updating-force-modal-flow/updating-force-modal-flow-test-ids.enum"
import UpdatingForceModalFlow from "Core/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { UpdatingForceModalFlowProps } from "Core/overview/components/updating-force-modal-flow/updating-force-modal-flow.interface"
import { OsReleaseType, Product, UpdateError } from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import {
  constructWrapper,
  renderWithThemeAndIntl,
} from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

const defaultProps: UpdatingForceModalFlowProps = {
  deviceType: DeviceType.MuditaPure,
  availableReleasesForUpdate: [],
  enabled: true,
  checkForUpdateState: CheckForUpdateState.Initial,
  forceUpdateState: State.Initial,
  error: null,
  updatingReleasesProcessStates: [],
  closeForceUpdateFlow: jest.fn(),
  openContactSupportFlow: jest.fn(),
  openHelpView: jest.fn(),
  startForceUpdate: jest.fn(),
}

const defaultState = {
  appState: {
    dialogOpen: false,
  },
} as ReduxRootState

const render = (
  extraProps?: Partial<UpdatingForceModalFlowProps>,
  state = defaultState
) => {
  const store = createMockStore([thunk])(state)
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(
    <Provider store={store}>
      <UpdatingForceModalFlow {...props} />
    </Provider>
  )
  return {
    ...outcome,
    rerender: (newExtraProps: Partial<UpdatingForceModalFlowProps>) => {
      const newProps = {
        ...defaultProps,
        ...newExtraProps,
      }
      outcome.rerender(
        constructWrapper(
          <Provider store={store}>
            <UpdatingForceModalFlow {...newProps} />
          </Provider>
        )
      )
    },
  }
}

const release: OsRelease = {
  version: "0.73.1",
  date: "2021-07-09T13:57:39Z",
  product: Product.PurePhone,
  type: OsReleaseType.Production,
  file: {
    url: "www.mudita.com/assets/39998772",
    name: "release-0.73.1",
    size: 26214400,
  },
  mandatoryVersions: [],
}

const checkModalsVisibility = (
  queryFunction: (id: string) => HTMLElement | null,
  visibleId: UpdatingForceModalFlowTestIds
) => {
  const allIds: UpdatingForceModalFlowTestIds[] = Object.values(
    UpdatingForceModalFlowTestIds
  )

  allIds.forEach((id) => {
    if (visibleId === id) {
      expect(queryFunction(id)).toBeInTheDocument()
    } else {
      expect(queryFunction(id)).not.toBeInTheDocument()
    }
  })
}

describe("when force update mode is enabled and force update state is set to initial", () => {
  test("only info modal should be shown", () => {
    const { queryByTestId } = render({
      enabled: true,
      forceUpdateState: State.Initial,
    })
    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingForceInfoModal
    )
  })
})

describe("when force update state equals is in pending state", () => {
  test("only loading modal should be shown", () => {
    const { queryByTestId } = render({
      enabled: true,
      forceUpdateState: State.Loading,
      availableReleasesForUpdate: [release],
    })
    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal
    )
  })
})

describe("when force update state equals is in success state", () => {
  test("only success modal should be shown", () => {
    const { queryByTestId } = render({
      enabled: true,
      forceUpdateState: State.Loaded,
    })
    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingSuccessModal
    )
  })
})

describe("when force update state equals is in error state", () => {
  describe("when error indicates that the battery is too low", () => {
    test("only battery too low error modal should be shown", () => {
      const { queryByTestId } = render({
        enabled: true,
        forceUpdateState: State.Failed,
        error: new AppError(UpdateError.TooLowBattery, "oups!"),
      })
      checkModalsVisibility(
        queryByTestId,
        UpdatingForceModalFlowTestIds.UpdatingForceTooLowBatteryModal
      )
    })
  })

  describe("when error indicates that the problem is not with battery", () => {
    test("only error modal should be shown", () => {
      const { queryByTestId } = render({
        enabled: true,
        forceUpdateState: State.Failed,
        error: new AppError(UpdateError.ForceUpdateError, "oups!"),
      })
      checkModalsVisibility(
        queryByTestId,
        UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
      )
    })
  })
})

describe("testing whole flow", () => {
  test("shows proper happy path modals for props and state changes", () => {
    const { queryByTestId, rerender } = render({
      enabled: true,
      forceUpdateState: State.Initial,
    })
    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingForceInfoModal
    )

    rerender({
      enabled: true,
      forceUpdateState: State.Loading,
      availableReleasesForUpdate: [release],
    })

    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal
    )

    rerender({
      enabled: true,
      forceUpdateState: State.Loaded,
    })

    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingSuccessModal
    )
  })

  test("shows proper error path modals for props and state changes", () => {
    const { queryByTestId, rerender } = render({
      enabled: true,
      forceUpdateState: State.Initial,
    })
    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingForceInfoModal
    )

    rerender({
      enabled: true,
      forceUpdateState: State.Loading,
      availableReleasesForUpdate: [release],
    })

    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal
    )

    rerender({
      enabled: true,
      forceUpdateState: State.Failed,
      error: new AppError(UpdateError.ForceUpdateError, "oups!"),
    })

    checkModalsVisibility(
      queryByTestId,
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  })
})
