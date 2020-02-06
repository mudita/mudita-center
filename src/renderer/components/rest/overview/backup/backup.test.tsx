import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { BackupProps } from "Renderer/components/rest/overview/backup/backup.interface"
import Backup from "Renderer/components/rest/overview/backup/backup.component"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { lastBackup } from "Renderer/components/rest/overview/backup/backup.stories"
import { fireEvent, wait } from "@testing-library/react"

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
  const { getByText, restoreButton, createButton } = renderBackup({
    lastBackup,
  })
  expect(
    getByText(
      intl.formatMessage({ id: "view.name.overview.backup.lastBackup" })
    )
  ).toBeInTheDocument()
  expect(getByText(lastBackup)).toBeInTheDocument()
  expect(restoreButton()).toBeInTheDocument()
  expect(createButton()).toBeInTheDocument()
})

test("backup creation button works properly", async () => {
  const onBackupCreate = jest.fn()

  const { createButton } = renderBackup({
    onBackupCreate,
  })

  fireEvent.click(createButton())

  await wait(() => {
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

  await wait(() => {
    expect(onBackupRestore).toHaveBeenCalled()
  })
})
