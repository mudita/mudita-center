/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { fireEvent } from "@testing-library/react"
import Backup from "App/overview/components/backup/backup.component"

jest.mock("Renderer/requests/get-file-data")

const lastBackup = {
  createdAt: "2020-01-15T07:35:01.562Z",
  size: 102400,
}

type Props = ComponentProps<typeof Backup>

const defaultProps: Props = {
  appAutostart: false,
  appCollectingData: undefined,
  appConversionFormat: undefined,
  appConvert: undefined,
  appIncomingCalls: false,
  appIncomingMessages: false,
  appLowBattery: false,
  appNonStandardAudioFilesConversion: false,
  appOsUpdates: false,
  appTethering: false,
  appTray: false,
  diagnosticSentTimestamp: 0,
  language: "en-US",
  onBackupCreate: noop,
  pureNeverConnected: false,
  pureOsBackupLocation: "",
  pureOsDownloadLocation: ""

}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(
    <Backup {...props} />
  )
  return {
    ...outcome,
    createButton: () =>
      outcome.getByText(
        intl.formatMessage({ id: "module.overview.backupCreateAction" })
      ),
    restoreButton: () =>
      outcome.getByText(
        intl.formatMessage({ id: "module.overview.backupRestoreAction" })
      ),
  }
}

test("renders no backup info properly", () => {
  const { getByText, createButton } = renderer()
  expect(
    getByText(intl.formatMessage({ id: "module.overview.backupCreateFirst" }))
  ).toBeInTheDocument()
  expect(createButton()).toBeInTheDocument()
})

test("renders available backup info properly", () => {
  const { getByText, restoreButton, createButton } = renderer({
    lastBackup,
  })
  expect(
    getByText("module.overview.backupLastBackup", { exact: false })
  ).toBeInTheDocument()
  expect(restoreButton()).toBeInTheDocument()
  expect(createButton()).toBeInTheDocument()
})

test("backup creation button works properly", () => {
  const onBackupCreate = jest.fn()

  const { createButton } = renderer({
    onBackupCreate,
  })

  fireEvent.click(createButton())

  expect(onBackupCreate).toHaveBeenCalled()
})

test("backup restore button works properly", () => {
  const onBackupRestore = jest.fn()

  const { restoreButton } = renderer({
    lastBackup,
    onBackupRestore,
  })

  fireEvent.click(restoreButton())

  expect(onBackupRestore).toHaveBeenCalled()
})
