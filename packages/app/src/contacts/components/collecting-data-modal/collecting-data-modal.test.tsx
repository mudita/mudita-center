/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CollectingDataModal from "App/contacts/components/collecting-data-modal/collecting-data-modal.component"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { CollectingDataModalTestIds } from "App/contacts/components/collecting-data-modal/collecting-data-modal-test-ids.enum"

const agree = jest.fn()
const close = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

const renderer = (extraProps?: {}) => {
  const props = {
    agree,
    close,
  }
  return renderWithThemeAndIntl(
    <CollectingDataModal {...props} {...extraProps} />
  )
}

test("agree is fired after button is clicked", () => {
  const { getByTestId } = renderer()
  getByTestId(ModalTestIds.ModalActionButton).click()
  expect(agree).toBeCalled()
})

test("close is fired after bottom button is clicked", () => {
  const { getByTestId } = renderer()
  getByTestId(ModalTestIds.CloseBottomButton).click()
  expect(close).toBeCalled()
})

test("subtitle has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(CollectingDataModalTestIds.Subtitle)).toHaveTextContent(
    "[value] app.collecting.data.modal.text"
  )
})

test("body has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(CollectingDataModalTestIds.Body)).toHaveTextContent(
    "[value] app.collecting.data.modal.body"
  )
})
