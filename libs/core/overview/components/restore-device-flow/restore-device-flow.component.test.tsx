/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import RestoreDeviceFlow, {
  RestoreDeviceFlowState,
} from "Core/overview/components/restore-device-flow/restore-device-flow.component"
import { RestoreDeviceFlowTestIds } from "Core/overview/components/restore-device-flow/restore-device-flow-test-ids.component"
import { Backup } from "Core/backup/dto"
import { RestoreAvailableBackupModalTestIds } from "Core/overview/components/restore-modal-dialogs/restore-available-backup-modal-test-ids.component"
import { fireEvent } from "@testing-library/dom"
import { AppError } from "Core/core/errors"
import { BackupError } from "Core/backup"

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
  error: null,
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

const checkModalsVisibility = (
  visibleElementId: RestoreDeviceFlowTestIds,
  queryFunction: (id: string) => HTMLElement | null
) => {
  const values = Object.values(RestoreDeviceFlowTestIds)

  values.forEach((value) => {
    if (value === visibleElementId) {
      expect(queryFunction(value)).toBeInTheDocument()
    } else {
      expect(queryFunction(value)).not.toBeInTheDocument()
    }
  })
}

describe("`RestoreDeviceFlow` component", () => {
  describe("when component is render with default props", () => {
    test("should be displayed `RestoreAvailableBackupModal`", () => {
      const { queryByTestId } = render()

      checkModalsVisibility(
        RestoreDeviceFlowTestIds.RestoreAvailableBackupModal,
        queryByTestId
      )
    })
  })

  describe("when component active backup is set", () => {
    test("should be displayed `RestoreDeviceStart`", () => {
      const { queryByTestId, queryAllByTestId } = render()
      const rows = queryAllByTestId(
        RestoreAvailableBackupModalTestIds.RestoreAvailableBackupModalBodyRow
      )
      fireEvent.click(rows[0])

      checkModalsVisibility(
        RestoreDeviceFlowTestIds.RestoreDeviceStart,
        queryByTestId
      )
    })
  })

  describe("when `openState` property is set to `SecretKeySetting`", () => {
    const extraProps: Partial<Props> = {
      openState: RestoreDeviceFlowState.SecretKeySetting,
    }
    test("should be displayed `RestoreConfirmSecretKeyModal`", () => {
      const { queryByTestId } = render(extraProps)

      checkModalsVisibility(
        RestoreDeviceFlowTestIds.RestoreSecretKeySetting,
        queryByTestId
      )
    })
  })

  describe("when `openState` property is set to `Running`", () => {
    const extraProps: Partial<Props> = {
      openState: RestoreDeviceFlowState.Running,
    }
    test("should be displayed `RestoreModal`", () => {
      const { queryByTestId } = render(extraProps)

      checkModalsVisibility(
        RestoreDeviceFlowTestIds.RestoreDeviceRunning,
        queryByTestId
      )
    })
  })

  describe("when `openState` property is set to `Finished`", () => {
    const extraProps: Partial<Props> = {
      openState: RestoreDeviceFlowState.Finished,
    }
    test("should be displayed `RestoreSuccessModal`", () => {
      const { queryByTestId } = render(extraProps)

      checkModalsVisibility(
        RestoreDeviceFlowTestIds.RestoreDeviceFinished,
        queryByTestId
      )
    })
  })

  describe("when `openState` property is set to `Error` and error does not equal to InvalidToken", () => {
    const extraProps: Partial<Props> = {
      openState: RestoreDeviceFlowState.Error,
      error: new AppError(BackupError.CannotReadBackupFile, "Oups"),
    }
    test("should be displayed `RestoreFailureModal`", () => {
      const { queryByTestId } = render(extraProps)

      checkModalsVisibility(
        RestoreDeviceFlowTestIds.RestoreDeviceError,
        queryByTestId
      )
    })
  })

  describe("when `openState` property is set to `Error` and error equals to InvalidToken", () => {
    const extraProps: Partial<Props> = {
      openState: RestoreDeviceFlowState.Error,
      error: new AppError(BackupError.InvalidToken, "Oups"),
    }
    test("should be displayed `InvalidBackupPasswordModal`", () => {
      const { queryByTestId } = render(extraProps)

      checkModalsVisibility(
        RestoreDeviceFlowTestIds.RestoreDeviceInvalidPasswordError,
        queryByTestId
      )
    })
  })
})
