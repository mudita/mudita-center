/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const renderer = (props = {}) =>
  renderWithThemeAndIntl(<ModalDialog open {...props} />)

test("close button is hidden by default", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(ModalTestIds.CloseButton)).not.toBeInTheDocument()
})

test("close button closes modal", () => {
  const closeModal = jest.fn()
  const { getByTestId } = renderer({ closeModal })
  getByTestId(ModalTestIds.CloseButton).click()
  expect(closeModal).toBeCalled()
})

test("close action button renders by default", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ModalTestIds.CloseBottomButton)).toBeInTheDocument()
})

test("close action button closes modal", () => {
  const closeModal = jest.fn()
  const { getByTestId } = renderer({ closeModal })
  getByTestId(ModalTestIds.CloseBottomButton).click()
  expect(closeModal).toBeCalled()
})

test("close action button doesn't render", () => {
  const { queryByTestId } = renderer({ closeButton: false })
  expect(queryByTestId(ModalTestIds.CloseBottomButton)).not.toBeInTheDocument()
})

test("action button doesn't render by default", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(ModalTestIds.ModalActionButton)).not.toBeInTheDocument()
})

test("action button perform its action", () => {
  const onActionButtonClick = jest.fn()
  const { getByTestId } = renderer({
    actionButtonLabel: "somelabel",
    onActionButtonClick,
  })
  getByTestId(ModalTestIds.ModalActionButton).click()
  expect(onActionButtonClick).toBeCalled()
})
