/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"
import { AppError } from "Core/core/errors"
import { DeviceType } from "Core/device"
import { UpdateOsFlow } from "Core/overview/components/update-os-flow"
import { UpdateOsFlowTestIds } from "Core/overview/components/update-os-flow/update-os-flow-test-ids.enum"
import { UpdateOsFlowProps } from "Core/overview/components/update-os-flow/update-os-flow.component.interface"
import {
  DownloadState,
  OsReleaseType,
  ReleaseProcessState,
  SilentCheckForUpdateState,
  UpdateError,
} from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { Product } from "Core/__deprecated__/main/constants"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"

jest.mock("Core/settings/store/schemas/generate-application-id", () => ({
  generateApplicationId: () => "123",
}))

jest.mock("@electron/remote", () => ({
  Menu: () => ({
    popup: jest.fn(),
    append: jest.fn(),
  }),
  MenuItem: () => jest.fn(),
}))

const defaultProps: UpdateOsFlowProps = {
  checkForUpdateState: CheckForUpdateState.Initial,
  downloadState: DownloadState.Initial,
  updateState: State.Initial,
  silentCheckForUpdateState: SilentCheckForUpdateState.Initial,
  allReleases: [],
  availableReleasesForUpdate: null,
  currentOsVersion: "1.2.0",
  error: null,
  abortDownloading: jest.fn(),
  clearUpdateOsFlow: jest.fn(),
  downloadUpdates: jest.fn(),
  openContactSupportFlow: jest.fn(),
  openHelpView: jest.fn(),
  updateOs: jest.fn(),
  tryAgainCheckForUpdate: jest.fn(),
  downloadingReleasesProcessStates: null,
  updatingReleasesProcessStates: null,
  areAllReleasesDownloaded: false,
  deviceType: DeviceType.MuditaPure,
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

const tooLowBatteryError = new AppError(
  UpdateError.TooLowBattery,
  "Device has too low battery level"
)

const downloadError = new AppError(
  UpdateError.UnexpectedDownloadError,
  "Unexpected download error"
)

const updateError = new AppError(
  UpdateError.UpdateOsProcess,
  "Unexpected update error"
)

const notEnoughSpaceError = new AppError(
  UpdateError.NotEnoughSpace,
  "Device updating process failed"
)

const onboardingNotCompleteError = new AppError(
  UpdateError.OnboardingNotComplete,
  "Device updating process failed"
)

const render = (extraProps?: Partial<UpdateOsFlowProps>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<UpdateOsFlow {...props} />)
  return {
    ...outcome,
  }
}

const checkModalsVisibility = (
  queryFunction: (id: string) => HTMLElement | null,
  visibleIds: UpdateOsFlowTestIds[]
) => {
  const allIds: UpdateOsFlowTestIds[] = Object.values(UpdateOsFlowTestIds)

  allIds.forEach((id) => {
    if (visibleIds.includes(id)) {
      expect(queryFunction(id)).toBeInTheDocument()
    } else {
      expect(queryFunction(id)).not.toBeInTheDocument()
    }
  })
}

test("by default all elements are not visible", () => {
  const { queryByTestId } = render()

  checkModalsVisibility(queryByTestId, [])
})

describe("check for update modals", () => {
  describe("when check for update state is marked as loading", () => {
    test("loading modal should be displayed", () => {
      const { queryByTestId } = render({
        checkForUpdateState: CheckForUpdateState.Loading,
      })
      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.CheckForUpdateModal,
      ])
    })
  })

  describe("when check for update state is marked as loaded and there is available release to be updated", () => {
    test("update available modal should be displayed", () => {
      const { queryByTestId } = render({
        checkForUpdateState: CheckForUpdateState.Loaded,
        availableReleasesForUpdate: [release],
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.UpdateAvailableModal,
      ])
    })
  })

  describe("when check for update state is marked as loaded and there is no available release to be updated", () => {
    test("update not available modal should be displayed", () => {
      const { queryByTestId } = render({
        checkForUpdateState: CheckForUpdateState.Loaded,
        availableReleasesForUpdate: null,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.UpdateNotAvailableModal,
      ])
    })
  })

  describe("when check for update state failed", () => {
    test("check for update failed modal should be displayed", () => {
      const { queryByTestId } = render({
        checkForUpdateState: CheckForUpdateState.Failed,
        availableReleasesForUpdate: null,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.CheckForUpdateFailedModal,
      ])
    })
  })

  describe("when silent check for update state failed", () => {
    test("check for update failed modal should be displayed", () => {
      const { queryByTestId } = render({
        checkForUpdateState: CheckForUpdateState.Initial,
        silentCheckForUpdateState: SilentCheckForUpdateState.Failed,
        availableReleasesForUpdate: null,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.CheckForUpdateFailedModal,
      ])
    })
  })
})

describe("download modals", () => {
  describe("when download state is marked as loading and there is a downloaded release", () => {
    test("loading modal should be displayed", () => {
      const { queryByTestId } = render({
        downloadState: DownloadState.Loading,
        downloadingReleasesProcessStates: [
          {
            release,
            state: ReleaseProcessState.InProgress,
          },
        ],
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.DownloadingUpdateModal,
      ])
    })
  })

  describe("when check for update state is marked as loaded", () => {
    test("downloading finished modal should be displayed", () => {
      const { queryByTestId } = render({
        downloadState: DownloadState.Loaded,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.DownloadingFinishedModal,
      ])
    })
  })

  describe("when downloading failed because of too low battery", () => {
    test("too low battery modal is shown", () => {
      const { queryByTestId } = render({
        downloadState: DownloadState.Failed,
        error: tooLowBatteryError,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.TooLowBatteryModal,
      ])
    })
  })

  describe("when downloading was cancelled", () => {
    test("cancelled downloading modal is shown", () => {
      const { queryByTestId } = render({
        downloadState: DownloadState.Cancelled,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.DownloadingCancelledModal,
      ])
    })
  })

  describe("when downloading failed because of unexpected error", () => {
    test("error modal is shown", () => {
      const { queryByTestId } = render({
        downloadState: DownloadState.Failed,
        error: downloadError,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.DownloadingInterruptedModal,
      ])
    })
  })

  describe("when downloading succeeded", () => {
    test("download completed modal is shown", () => {
      const { queryByTestId } = render({
        downloadState: DownloadState.Failed,
        error: downloadError,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.DownloadingInterruptedModal,
      ])
    })
  })
})

describe("update os", () => {
  describe("when os update is being performed and there is one release being installed", () => {
    test("spinner modal is shown", () => {
      const { queryByTestId } = render({
        updateState: State.Loading,
        updatingReleasesProcessStates: [
          {
            release,
            state: ReleaseProcessState.InProgress,
          },
        ],
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.UpdateInProgressModal,
      ])
    })
  })

  describe("when updating os succeeded", () => {
    test("success modal is shown", () => {
      const { queryByTestId } = render({
        updateState: State.Loaded,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.UpdateSuccessModal,
      ])
    })
  })

  describe("when updating failed because of unexpected error", () => {
    test("error modal is shown", () => {
      const { queryByTestId } = render({
        updateState: State.Failed,
        error: updateError,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.UpdateFailedModal,
      ])
    })
  })

  describe("when updating failed because of lack of memory", () => {
    test("error modal is shown", () => {
      const { queryByTestId } = render({
        updateState: State.Failed,
        error: notEnoughSpaceError,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.NotEnoughSpaceModal,
      ])
    })
  })

  describe("when updating failed because of onboarding isn't complete", () => {
    test("error modal is shown", () => {
      const { queryByTestId } = render({
        updateState: State.Failed,
        error: onboardingNotCompleteError,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.OnboardingNotCompleteModal,
      ])
    })
  })
})
