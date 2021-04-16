/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
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
  getByText("[value] module.recoveryMode.backupTitle").click()
  expect(defaultProps.onBackupClick).toBeCalled()
})

test("reboot os action is performed", () => {
  const { getByText } = renderer()
  getByText("[value] module.recoveryMode.rebootOsTitle").click()
  expect(defaultProps.onRebootOsClick).toBeCalled()
})

test("restore action is performed", () => {
  const { getByText } = renderer()
  getByText("[value] module.recoveryMode.restoreTitle").click()
  expect(defaultProps.onRestoreClick).toBeCalled()
})

test("factory reset action is performed", () => {
  const { getByText } = renderer()
  getByText("[value] module.recoveryMode.factoryResetTitle").click()
  expect(defaultProps.onFactoryResetClick).toBeCalled()
})

test("support button works correctly", () => {
  const { getByText } = renderer()
  getByText(
    "[value] module.onboarding.supportButton"
  ).click()
  expect(defaultProps.onSupportButtonClick).toBeCalled()
})
