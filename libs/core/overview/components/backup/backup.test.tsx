/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { fireEvent } from "@testing-library/react"
import Backup from "Core/overview/components/backup/backup.component"

jest.mock("Core/backup/requests/load-backups.request")

const lastBackupDate = new Date("2020-01-15T07:35:01.562Z")

type Props = ComponentProps<typeof Backup>

const defaultProps: Props = {
  diagnosticSentTimestamp: 0,
  language: "en-US",
  onBackupCreate: noop,
  osBackupLocation: "",
  osDownloadLocation: "",
  backupActionDisabled: false,
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<Backup {...props} />)
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
    getByText(
      intl.formatMessage({
        id: "module.overview.backupInfoBackupNotAvaibleDescription",
      })
    )
  ).toBeInTheDocument()
  expect(createButton()).toBeInTheDocument()
})

test("renders available backup info properly", () => {
  const { getByText, restoreButton, createButton } = renderer({
    lastBackupDate,
  })
  expect(
    getByText("module.overview.backupInfoBackupAvaibleDescription", {
      exact: false,
    })
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
    lastBackupDate,
    onBackupRestore,
  })

  fireEvent.click(restoreButton())

  expect(onBackupRestore).toHaveBeenCalled()
})
