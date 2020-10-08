import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import { RecoveryModeTestIds } from "Renderer/modules/recovery-mode/recovery-mode-test-ids.enum"
import RecoveryModeUI, {
  SafeModeAction,
} from "Renderer/modules/recovery-mode/recovery-mode-ui.component"

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
  const { getByTestId } = renderer()
  getByTestId(SafeModeAction.Backup).click()
  expect(defaultProps.onBackupClick).toBeCalled()
})

test("reboot os action is performed", () => {
  const { getByTestId } = renderer()
  getByTestId(SafeModeAction.RebootOs).click()
  expect(defaultProps.onRebootOsClick).toBeCalled()
})

test("restore action is performed", () => {
  const { getByTestId } = renderer()
  getByTestId(SafeModeAction.Restore).click()
  expect(defaultProps.onRestoreClick).toBeCalled()
})

test("factory reset action is performed", () => {
  const { getByTestId } = renderer()
  getByTestId(SafeModeAction.FactoryReset).click()
  expect(defaultProps.onFactoryResetClick).toBeCalled()
})

test("support button works correctly", () => {
  const { getByTestId } = renderer()
  getByTestId(RecoveryModeTestIds.SupportButton).click()
  expect(defaultProps.onSupportButtonClick).toBeCalled()
})
