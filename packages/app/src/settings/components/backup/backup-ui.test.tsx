/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import BackupUI from "App/settings/components/backup/backup-ui.component"

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
