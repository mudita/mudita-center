/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CollectingDataModal from "App/contacts/components/collecting-data-modal/collecting-data-modal.component"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"

const onAgree = jest.fn()
const onClose = jest.fn()

const renderer = (extraProps?: {}) => {
  const props = {
    onAgree,
    onClose,
  }
  return renderWithThemeAndIntl(
    <CollectingDataModal {...props} {...extraProps} />
  )
}

test("onAgree is fired after button is clicked", () => {
  const { getByTestId } = renderer()
  getByTestId(ModalTestIds.ModalActionButton).click()
  expect(onAgree).toBeCalled()
})

test("onClose is fired after bottom button is clicked", () => {
  const { getByTestId } = renderer()
  getByTestId(ModalTestIds.CloseBottomButton).click()
  expect(onClose).toBeCalled()
})

test("onClose is fired after 'x' button is clicked", () => {
  const { getByTestId } = renderer()
  getByTestId(ModalTestIds.CloseButton).click()
  expect(onClose).toBeCalled()
})
