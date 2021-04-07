/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import BackupModalFlow from "Renderer/components/rest/overview/backup/backup-modal-flow.component"
import { BackupModalFlowTestIds } from "Renderer/components/rest/overview/backup/backup-modal-flow-test-ids.enum"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"

const defaultProps: React.ComponentProps<typeof BackupModalFlow> = {
  closeBackupFailedModal: jest.fn(),
  closeBackupFinishedModal: jest.fn(),
  closeBackupStartModal: jest.fn(),
  startBackup: jest.fn(),
  language: "en-US",
  pureOsBackupLocation: "pure/backups",
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(<BackupModalFlow {...props} />)
}

test("no modal is rendered by default", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(BackupModalFlowTestIds.Start)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Loading)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Finished)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Failed)).not.toBeInTheDocument()
})

test("only backup start modal is rendered", () => {
  const { getByTestId, queryByTestId } = renderer({
    openBackupStartModal: true,
  })
  expect(getByTestId(BackupModalFlowTestIds.Start)).toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Loading)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Finished)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Failed)).not.toBeInTheDocument()
})

test("only backup loading modal is rendered", () => {
  const { getByTestId, queryByTestId } = renderer({
    openBackupLoadingModal: true,
  })
  expect(getByTestId(BackupModalFlowTestIds.Loading)).toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Start)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Finished)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Failed)).not.toBeInTheDocument()
})

test("only backup finished modal is rendered", () => {
  const { getByTestId, queryByTestId } = renderer({
    openBackupFinishedModal: true,
  })
  expect(getByTestId(BackupModalFlowTestIds.Finished)).toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Loading)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Start)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Failed)).not.toBeInTheDocument()
})

test("only backup failed modal is rendered", () => {
  const { getByTestId, queryByTestId } = renderer({
    openBackupFailedModal: true,
  })
  expect(getByTestId(BackupModalFlowTestIds.Failed)).toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Loading)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Start)).not.toBeInTheDocument()
  expect(queryByTestId(BackupModalFlowTestIds.Finished)).not.toBeInTheDocument()
})

test("start backup action is performed", () => {
  const startBackup = jest.fn()
  const { getByTestId } = renderer({
    openBackupStartModal: true,
    startBackup,
  })
  getByTestId(ModalTestIds.ModalActionButton).click()
  expect(startBackup).toBeCalled()
})

test("close start backup modal action is performed", () => {
  const closeBackupStartModal = jest.fn()
  const { getByTestId } = renderer({
    openBackupStartModal: true,
    closeBackupStartModal,
  })
  getByTestId(ModalTestIds.CloseBottomButton).click()
  expect(closeBackupStartModal).toBeCalled()
})

test("close finished backup modal action is performed", () => {
  const closeBackupFinishedModal = jest.fn()
  const { getByTestId } = renderer({
    openBackupFinishedModal: true,
    closeBackupFinishedModal,
  })
  getByTestId(ModalTestIds.CloseBottomButton).click()
  expect(closeBackupFinishedModal).toBeCalled()
})

test("close failed backup modal action is performed", () => {
  const closeBackupFailedModal = jest.fn()
  const { getByTestId } = renderer({
    openBackupFailedModal: true,
    closeBackupFailedModal,
  })
  getByTestId(ModalTestIds.CloseBottomButton).click()
  expect(closeBackupFailedModal).toBeCalled()
})
