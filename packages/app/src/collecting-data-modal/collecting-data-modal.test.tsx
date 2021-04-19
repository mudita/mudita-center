/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CollectingDataModal from "App/collecting-data-modal/collecting-data-modal.component"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { CollectingDataModalTestIds } from "App/collecting-data-modal/collecting-data-modal-test-ids.enum"
import { waitFor } from "@testing-library/react"

const agree = jest.fn()
const close = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

const renderer = (extraProps?: {}) => {
  const props = {
    onActionButtonClick: agree,
    onClose: close,
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

test("close is fired after bottom button is clicked", async () => {
  const { getByTestId } = renderer()
  getByTestId(ModalTestIds.CloseBottomButton).click()
  await waitFor(() => expect(close).toBeCalled())
})

test("close is fired after 'x' button is clicked", async () => {
  const { getByTestId } = renderer()
  getByTestId(ModalTestIds.CloseButton).click()
  await waitFor(() => expect(close).toBeCalled())
})

test("subtitle has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(CollectingDataModalTestIds.Subtitle)).toHaveTextContent(
    "[value] component.collectingDataModalText"
  )
})

test("body has correct text", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(CollectingDataModalTestIds.Body)).toHaveTextContent(
    "[value] component.collectingDataModalBody"
  )
})
