/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom"
import React from "react"
import BackupUI from "Renderer/modules/settings/tabs/backup/backup-ui.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <BackupUI backupLocation="C:/MuditaOs" />
  )
  expect(container).toMatchSnapshot()
})

test("passed prop is displayed in correct place", () => {
  const location = "C:/MuditaOs"
  const { getByTestId } = renderWithThemeAndIntl(
    <BackupUI backupLocation={location} />
  )
  expect(getByTestId("backup-location")).toHaveTextContent(location)
})
