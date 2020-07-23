import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { BackupProps } from "Renderer/components/rest/overview/backup/backup.interface"
import Backup from "Renderer/components/rest/overview/backup/backup.component"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { lastBackup } from "Renderer/components/rest/overview/backup/backup.stories"
import { fireEvent, waitFor } from "@testing-library/react"
import registerAppSettingsRequest from "Backend/requests/app-settings/get-app-settings.request"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const lastBackupDate = new Date(lastBackup.createdAt).toLocaleDateString(
  "en-US"
)

const renderBackup = ({
  onBackupCreate = noop,
  ...props
}: Partial<BackupProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Backup onBackupCreate={onBackupCreate} {...props} />
  )
  return {
    ...outcome,
    createButton: () =>
      outcome.getByText(
        intl.formatMessage({ id: "view.name.overview.backup.createAction" })
      ),
    restoreButton: () =>
      outcome.getByText(
        intl.formatMessage({ id: "view.name.overview.backup.restoreAction" })
      ),
  }
}

test("renders no backup info properly", () => {
  const { getByText, createButton } = renderBackup()
  expect(
    getByText(
      intl.formatMessage({ id: "view.name.overview.backup.createFirst" })
    )
  ).toBeInTheDocument()
  expect(createButton()).toBeInTheDocument()
})

test("renders available backup info properly", () => {
  registerAppSettingsRequest(getFakeAdapters())
  ;(ipcMain as any)._flush(IpcRequest.GetAppSettings)

  const { getByText, restoreButton, createButton } = renderBackup({
    lastBackup,
  })
  expect(
    getByText(
      intl.formatMessage({ id: "view.name.overview.backup.lastBackup" })
    )
  ).toBeInTheDocument()
  expect(getByText(lastBackupDate)).toBeInTheDocument()
  expect(restoreButton()).toBeInTheDocument()
  expect(createButton()).toBeInTheDocument()
})

test("backup creation button works properly", async () => {
  const onBackupCreate = jest.fn()

  const { createButton } = renderBackup({
    onBackupCreate,
  })

  fireEvent.click(createButton())

  await waitFor(() => {
    expect(onBackupCreate).toHaveBeenCalled()
  })
})

test("backup restore button works properly", async () => {
  const onBackupRestore = jest.fn()

  const { restoreButton } = renderBackup({
    lastBackup,
    onBackupRestore,
  })

  fireEvent.click(restoreButton())

  await waitFor(() => {
    expect(onBackupRestore).toHaveBeenCalled()
  })
})
