/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdateOsInterruptedFlowTestIds } from "App/update/components/update-os-interrupted-flow/update-os-interrupted-flow-test-ids"
import { UpdateOsInterruptedFlow } from "App/update/components/update-os-interrupted-flow/update-os-interrupted-flow.component"
import { UpdateOsInterruptedFlowProps } from "App/update/components/update-os-interrupted-flow/update-os-interrupted-flow.interface"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

const defaultProps: UpdateOsInterruptedFlowProps = {
  alreadyDownloadedReleases: [],
  downloadInterruptedModalOpened: false,
  updateInterruptedModalOpened: false,
  onClose: jest.fn(),
  openContactSupportFlow: jest.fn(),
}

const render = (extraProps?: Partial<UpdateOsInterruptedFlowProps>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<UpdateOsInterruptedFlow {...props} />)
  return {
    ...outcome,
  }
}

test("by default it does not show any modal", () => {
  const { queryByTestId } = render()
  expect(
    queryByTestId(UpdateOsInterruptedFlowTestIds.DownloadingInterruptedModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdateOsInterruptedFlowTestIds.UpdatingInterruptedModal)
  ).not.toBeInTheDocument()
})

test("shows downloading interrupted modals", () => {
  const { queryByTestId } = render({
    downloadInterruptedModalOpened: true,
  })
  expect(
    queryByTestId(UpdateOsInterruptedFlowTestIds.DownloadingInterruptedModal)
  ).toBeInTheDocument()
  expect(
    queryByTestId(UpdateOsInterruptedFlowTestIds.UpdatingInterruptedModal)
  ).not.toBeInTheDocument()
})

test("shows updating interrupted modals", () => {
  const { queryByTestId } = render({
    updateInterruptedModalOpened: true,
  })
  expect(
    queryByTestId(UpdateOsInterruptedFlowTestIds.DownloadingInterruptedModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(UpdateOsInterruptedFlowTestIds.UpdatingInterruptedModal)
  ).toBeInTheDocument()
})
