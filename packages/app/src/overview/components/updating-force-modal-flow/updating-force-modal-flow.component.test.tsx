/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { Product } from "App/__deprecated__/main/constants"
import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import UpdatingForceModalFlow from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { UpdatingForceModalFlowTestIds } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow-test-ids.component"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { ipcRenderer } from "electron-better-ipc"
import {
  IpcReleaseRequest,
  ReleaseType,
  ReleaseError,
} from "App/update/constants"
import { Release } from "App/update/dto"
import { waitFor } from "@testing-library/dom"
import { PureOsDownloadChannels } from "App/__deprecated__/main/functions/register-pure-os-download-listener"
import { DownloadStatus } from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"

type Props = ComponentProps<typeof UpdatingForceModalFlow>

const defaultProps: Props = {
  deviceType: DeviceType.MuditaPure,
  state: UpdatingForceModalFlowState.Info,
  osVersion: "0.72.1",
  onContact: jest.fn(),
  onHelp: jest.fn(),
  updateOs: jest.fn(),
  batteryLevel: 0.6,
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
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<UpdatingForceModalFlow {...props} />)
  return {
    ...outcome,
  }
}

test("form renders properly", () => {
  const { getByTestId, queryByTestId } = render()

  expect(
    getByTestId(UpdatingForceModalFlowTestIds.UpdatingForceInfoModal)
  ).toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceFailureModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingSuccessModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceTooLowBatteryModal)
  ).not.toBeInTheDocument()
})

test("failure modal is display after runUpdateProcess when osVersion is undefined", () => {
  const { getByTestId, queryByTestId } = render({ osVersion: undefined })

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceFailureModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingSuccessModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceInfoModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceTooLowBatteryModal)
  ).not.toBeInTheDocument()
})

test("Force modal is visible even fail modal was read ", () => {
  const { getByTestId, queryByTestId } = render({
    osVersion: undefined,
  })

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()

  getByTestId(ModalTestIds.CloseButton).click()

  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).not.toBeInTheDocument()
  expect(
    getByTestId(UpdatingForceModalFlowTestIds.UpdatingForceInfoModal)
  ).toBeInTheDocument()
})

test("failure modal is display if no is latestRelease", async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcReleaseRequest.GetLatestRelease]: Result.failed(
      new AppError(
        ReleaseError.GetAllRelease,
        "Fail during retrieving of the release"
      )
    ),
  }
  const { getByTestId, queryByTestId } = render()

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).not.toBeInTheDocument()

  await waitFor(noop)

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()
})

test("failure modal is display if latestRelease isn't higher than os", async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcReleaseRequest.GetLatestRelease]: Result.success(release),
  }
  const { getByTestId, queryByTestId } = render({
    osVersion: release.version,
  })

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).not.toBeInTheDocument()

  await waitFor(noop)

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()
})

test("failure modal is display if failure download os", async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcReleaseRequest.GetLatestRelease]: Result.failed(
      new AppError(
        ReleaseError.GetAllRelease,
        "Fail during retrieving of the release"
      )
    ),
    [PureOsDownloadChannels.start]: {
      status: DownloadStatus.Cancelled,
    },
  }
  const { getByTestId, queryByTestId } = render()

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).not.toBeInTheDocument()

  await waitFor(noop)
  await waitFor(noop)

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()
})

test("onHelp is called from the failure modal source", () => {
  const onHelp = jest.fn()
  const { getByTestId, queryByTestId } = render({
    osVersion: undefined,
    onHelp,
  })

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()

  getByTestId(ModalTestIds.ModalActionButton).click()
  expect(onHelp).toHaveBeenCalled()
})

test("onContact is called from the failure modal source", () => {
  const onContact = jest.fn()
  const { getByTestId, queryByTestId } = render({
    osVersion: undefined,
    onContact,
  })

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()

  getByTestId(ModalTestIds.CloseBottomButton).click()
  expect(onContact).toHaveBeenCalled()
})

test("TooLowBattery modal is display after runUpdateProcess when battery level is too low", () => {
  const { getByTestId, queryByTestId } = render({ batteryLevel: 0.2 })

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceTooLowBatteryModal)
  ).toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceFailureModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingSuccessModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceInfoModal)
  ).not.toBeInTheDocument()
})
