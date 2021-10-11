/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { noop } from "Renderer/utils/noop"
import RestoreDeviceFlow, {
  RestoreDeviceFlowState,
} from "App/overview/components/restore-device-flow/restore-device-flow.component"
import { RestoreDeviceFlowTestIds } from "App/overview/components/restore-device-flow/restore-device-flow-test-ids.component"
import { Backup } from "App/backup/reducers"
import { RestoreAvailableBackupModalTestIds } from "App/overview/components/restore-modal-dialogs/restore-available-backup-modal-test-ids.component"
import { fireEvent } from "@testing-library/dom"

type Props = ComponentProps<typeof RestoreDeviceFlow>

const backups: Backup[] = [
  {
    filePath: "C:\\backups\\backup-1.text",
    date: new Date(),
  },
]

const defaultProps: Props = {
  backups,
  onStartRestoreDeviceButtonClick: noop,
  onSupportButtonClick: noop,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<RestoreDeviceFlow {...props} />)
  return {
    ...outcome,
  }
}

describe("`RestoreDeviceFlow` component", () => {
  describe("when component is render with default props", () => {
    test("should be displayed `RestoreAvailableBackupModal`", () => {
      const { queryByTestId } = render()

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when component active backup is set", () => {
    test("should be displayed `RestoreDeviceStart`", () => {
      const { queryByTestId, queryAllByTestId } = render()
      const rows = queryAllByTestId(
        RestoreAvailableBackupModalTestIds.RestoreAvailableBackupModalBodyRow
      )
      fireEvent.click(rows[0])

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `openState` property is set to `Running`", () => {
    const extraProps: Partial<Props> = {
      openState: RestoreDeviceFlowState.Running,
    }
    test("should be displayed `RestoreModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `openState` property is set to `Finished`", () => {
    const extraProps: Partial<Props> = {
      openState: RestoreDeviceFlowState.Finished,
    }
    test("should be displayed `RestoreSuccessModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `openState` property is set to `Error`", () => {
    const extraProps: Partial<Props> = {
      openState: RestoreDeviceFlowState.Error,
    }
    test("should be displayed `RestoreFailureModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).not.toBeInTheDocument()
    })
  })
})
