/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import SyncContactsModal, {
  Props,
} from "Core/contacts/components/sync-contacts-modal/sync-contacts-modal.component"

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    onAppleButtonClick: jest.fn(),
    onGoogleButtonClick: jest.fn(),
    onManualImportClick: jest.fn(),
    onOutlookButtonClick: jest.fn(),
    open: true,
    disabledOtherMethod: false,
    onCancelManualImportClick: jest.fn(),
    ...extraProps,
  }
  return renderWithThemeAndIntl(<SyncContactsModal {...props} />)
}

test("apple button calls right function", () => {
  const onAppleButtonClick = jest.fn()
  const { getByText } = renderer({ onAppleButtonClick })
  getByText("[value] module.contacts.appleButtonText").click()
  expect(onAppleButtonClick).toBeCalled()
})

test("google button calls right function", () => {
  const onGoogleButtonClick = jest.fn()
  const { getByText } = renderer({ onGoogleButtonClick })
  getByText("[value] module.contacts.googleButtonText").click()
  expect(onGoogleButtonClick).toBeCalled()
})

test("outlook button calls right function", () => {
  const onOutlookButtonClick = jest.fn()
  const { getByText } = renderer({ onOutlookButtonClick })
  getByText("[value] module.contacts.outlookButtonText").click()
  expect(onOutlookButtonClick).toBeCalled()
})
