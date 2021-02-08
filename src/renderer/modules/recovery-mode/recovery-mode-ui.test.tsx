/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import RecoveryModeUI from "Renderer/modules/recovery-mode/recovery-mode-ui.component"

const defaultProps = {
  onSupportButtonClick: jest.fn(),
  onBackupClick: jest.fn(),
  onRebootOsClick: jest.fn(),
  onRestoreClick: jest.fn(),
  onFactoryResetClick: jest.fn(),
}

const renderer = () => {
  return renderWithThemeAndIntl(<RecoveryModeUI {...defaultProps} />)
}

test("backup action is performed", () => {
  const { getByText } = renderer()
  getByText("[value] view.name.recoveryMode.backupTitle").click()
  expect(defaultProps.onBackupClick).toBeCalled()
})

test("reboot os action is performed", () => {
  const { getByText } = renderer()
  getByText("[value] view.name.recoveryMode.rebootOsTitle").click()
  expect(defaultProps.onRebootOsClick).toBeCalled()
})

test("restore action is performed", () => {
  const { getByText } = renderer()
  getByText("[value] view.name.recoveryMode.restoreTitle").click()
  expect(defaultProps.onRestoreClick).toBeCalled()
})

test("factory reset action is performed", () => {
  const { getByText } = renderer()
  getByText("[value] view.name.recoveryMode.factoryResetTitle").click()
  expect(defaultProps.onFactoryResetClick).toBeCalled()
})

test("support button works correctly", () => {
  const { getByText } = renderer()
  getByText(
    "[value] view.name.onboarding.troubleshooting.support.button"
  ).click()
  expect(defaultProps.onSupportButtonClick).toBeCalled()
})
