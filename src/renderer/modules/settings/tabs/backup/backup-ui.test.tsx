import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import BackupUI from "Renderer/modules/settings/tabs/backup/backup-ui.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <BackupUI backupLocation="C:/MuditaOs" />
  )
  expect(container).toMatchSnapshot()
})
