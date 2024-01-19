/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { UpdateOsInterruptedFlowTestIds } from "Core/update/components/update-os-interrupted-flow/update-os-interrupted-flow-test-ids"
import { UpdateOsInterruptedFlow } from "Core/update/components/update-os-interrupted-flow/update-os-interrupted-flow.component"
import { UpdateOsInterruptedFlowProps } from "Core/update/components/update-os-interrupted-flow/update-os-interrupted-flow.interface"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { URL_ONBOARDING } from "Core/__deprecated__/renderer/constants/urls"

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: URL_ONBOARDING.welcome },
  }),
}));

const defaultProps: UpdateOsInterruptedFlowProps = {
  alreadyDownloadedReleases: [],
  alreadyInstalledReleases: [],
  downloadInterruptedModalOpened: false,
  updateInterruptedModalOpened: false,
  onClose: jest.fn(),
  deactivateDevice: jest.fn(),
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
