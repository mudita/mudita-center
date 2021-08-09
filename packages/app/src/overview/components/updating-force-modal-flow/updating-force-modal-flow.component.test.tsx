/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { noop } from "Renderer/utils/noop"
import UpdatingForceModalFlow, {
  UpdatingForceModalFlowState,
} from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { UpdatingForceModalFlowTestIds } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow-test-ids.component"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { ipcRenderer } from "electron-better-ipc"
import {
  GetAllReleasesEvents,
  Release,
} from "App/main/functions/register-get-all-releases-listener"
import { waitFor } from "@testing-library/dom"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import { DownloadStatus } from "Renderer/interfaces/file-download.interface"

type Props = ComponentProps<typeof UpdatingForceModalFlow>

const defaultProps: Props = {
  state: UpdatingForceModalFlowState.Info,
  osVersion: "0.72.1",
  onContact: jest.fn(),
  onHelp: jest.fn(),
  updateOs: jest.fn(),
}

const releases: Release[] = [
  {
    version: "0.73.1",
    date: "2021-07-09T13:57:39Z",
    prerelease: false,
    file: {
      url: "www.mudita.com/assets/39998772",
      name: "release-0.73.1",
      size: 26214400,
    },
  },
]

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
  ).toEqual(null)
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toEqual(null)
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceFailureModal)
  ).toEqual(null)
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingSuccessModal)
  ).toEqual(null)
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
  ).toEqual(null)
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceFailureModal)
  ).toEqual(null)
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingSuccessModal)
  ).toEqual(null)
  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceInfoModal)
  ).toEqual(null)
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
  ).toEqual(null)
  expect(
    getByTestId(UpdatingForceModalFlowTestIds.UpdatingForceInfoModal)
  ).toBeInTheDocument()
})

test("failure modal is display if no is latestRelease", async () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [GetAllReleasesEvents.Request]: [],
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
  ).toEqual(null)

  await waitFor(noop)

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).toEqual(null)
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()
})

test("failure modal is display if latestRelease isn't higher than os", async () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [GetAllReleasesEvents.Request]: releases,
  }
  const { getByTestId, queryByTestId } = render({
    osVersion: releases[0].version,
  })

  getByTestId(ModalTestIds.ModalActionButton).click()

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).toBeInTheDocument()
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toEqual(null)

  await waitFor(noop)

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).toEqual(null)
  expect(
    queryByTestId(
      UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
    )
  ).toBeInTheDocument()
})

test("failure modal is display if failure download os", async () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [GetAllReleasesEvents.Request]: [],
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
  ).toEqual(null)

  await waitFor(noop)
  await waitFor(noop)

  expect(
    queryByTestId(UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal)
  ).toEqual(null)
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
