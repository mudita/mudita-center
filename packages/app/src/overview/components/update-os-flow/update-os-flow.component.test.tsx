/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { UpdateOsFlow } from "App/overview/components/update-os-flow"
import { UpdateOsFlowTestIds } from "App/overview/components/update-os-flow/update-os-flow-test-ids.enum"
import { UpdateOsFlowProps } from "App/overview/components/update-os-flow/update-os-flow.component.interface"
import * as useDevUpdateModule from "App/overview/hooks/use-dev-os-update/use-dev-os-update"
import { DownloadState, ReleaseType, UpdateError } from "App/update/constants"
import { Release } from "App/update/dto"
import { Product } from "App/__deprecated__/main/constants"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

const defaultProps: UpdateOsFlowProps = {
  checkForUpdateState: State.Initial,
  downloadState: DownloadState.Initial,
  updateState: State.Initial,
  allReleases: [],
  availableReleasesForUpdate: null,
  currentOsVersion: "1.2.0",
  silentUpdateCheck: false,
  error: null,
  abortDownloading: jest.fn(),
  clearUpdateOsFlow: jest.fn(),
  downloadUpdate: jest.fn(),
  openContactSupportFlow: jest.fn(),
  openHelpView: jest.fn(),
  updateOs: jest.fn(),
}

const release: Release = {
  version: "0.73.1",
  date: "2021-07-09T13:57:39Z",
  product: Product.PurePhone,
  type: ReleaseType.Production,
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
        checkForUpdateState: State.Loading,
      })
      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.CheckForUpdateModal,
      ])
    })
  })

  describe("when check for update state is marked as loaded and there is available release to be updated", () => {
    test("update available modal should be displayed", () => {
      const { queryByTestId } = render({
        checkForUpdateState: State.Loaded,
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
        checkForUpdateState: State.Loaded,
        availableReleasesForUpdate: null,
      })

      checkModalsVisibility(queryByTestId, [
        UpdateOsFlowTestIds.UpdateNotAvailableModal,
      ])
    })
  })

  describe("when silient update check is being performed", () => {
    test("check update modals should not be visible", () => {
      const { queryByTestId } = render({
        checkForUpdateState: State.Loading,
        silentUpdateCheck: true,
      })

      checkModalsVisibility(queryByTestId, [])
    })
  })
})

describe("download modals", () => {
  describe("when download state is marked as loading", () => {
    test("loading modal should be displayed", () => {
      const { queryByTestId } = render({
        downloadState: DownloadState.Loading,
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
  describe("when os update is being performed", () => {
    test("spinner modal is shown", () => {
      const { queryByTestId } = render({
        updateState: State.Loading,
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
})

describe("dev update modal", () => {
  describe("when conditions are fulfilled to show download version of this modal", () => {
    test("the modal is rendered", () => {
      jest.spyOn(useDevUpdateModule, "useDevUpdate").mockImplementation(() => ({
        devRelease: release,
        downloadDevUpdate: jest.fn(),
        startDevUpdate: jest.fn(),
        closeDevModal: jest.fn(),
        canShowDownloadVersion: true,
        canShowInstallVersion: false,
      }))

      const { queryByTestId } = render()

      checkModalsVisibility(queryByTestId, [UpdateOsFlowTestIds.DevUpdate])
    })
  })

  describe("when conditions are fulfilled to show install version of this modal", () => {
    test("the modal is rendered", () => {
      jest.spyOn(useDevUpdateModule, "useDevUpdate").mockImplementation(() => ({
        devRelease: release,
        downloadDevUpdate: jest.fn(),
        startDevUpdate: jest.fn(),
        closeDevModal: jest.fn(),
        canShowDownloadVersion: false,
        canShowInstallVersion: true,
      }))

      const { queryByTestId } = render()

      checkModalsVisibility(queryByTestId, [UpdateOsFlowTestIds.DevUpdate])
    })
  })
})
