/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Modal from "Core/__deprecated__/renderer/components/core/modal/modal.component"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalTestIds } from "Core/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const defaultProps = {
  title: "Title",
  size: ModalSize.Medium,
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderer = (extraProps?: any) => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Modal {...props}>
      <h1>lala</h1>
      {/* AUTO DISABLED - fix me if you like :) */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      {extraProps?.children}
    </Modal>
  )
}

test("close button is rendered because modal is closeable by default", () => {
  const { getByTestId } = renderer()

  expect(getByTestId(ModalTestIds.CloseButton)).toBeInTheDocument()
})

test("close button is not rendered when modal is not closable", () => {
  const { container } = renderer({ closeable: false })

  const closeButton = container.querySelector("test-file-stub")
  expect(closeButton).not.toBeInTheDocument()
})

test("subtitle is rendered when provided", () => {
  const subtitle = "Subtitle"
  const { getByText } = renderer({ subtitle })
  expect(getByText(subtitle)).toBeInTheDocument()
})

test("only close button is rendered by default", () => {
  const closeButtonText = "component.modalCloseButton"
  const { getByText } = renderer()
  expect(getByText(closeButtonText, { exact: false })).toBeInTheDocument()
  expect(getByText(closeButtonText, { exact: false })).toBeTranslationKey()
})

test("action button is rendered when label and onActionButtonClick are provided", () => {
  const { getByTestId } = renderer({
    actionButtonLabel: "Action",
    onActionButtonClick: noop,
  })
  expect(getByTestId(ModalTestIds.ModalActionButton)).toBeInTheDocument()
})

test("action button is not rendered when only label is provided", () => {
  const { queryByTestId } = renderer({ actionButtonLabel: "Action" })

  expect(queryByTestId(ModalTestIds.ModalActionButton)).not.toBeInTheDocument()
})

test("action button is not rendered when only onActionButtonClick is provided", () => {
  const { queryByTestId } = renderer({ onActionButtonClick: noop })
  expect(queryByTestId(ModalTestIds.ModalActionButton)).not.toBeInTheDocument()
})

test("custom buttons are rendered", () => {
  const customButtonText = "buttonasda"
  const { getByText } = renderer({
    children: <button>{customButtonText}</button>,
  })
  expect(getByText(customButtonText)).toBeInTheDocument()
})

test("header is rendered", () => {
  const { queryByTestId } = renderer()

  expect(queryByTestId(ModalTestIds.Header)).toBeInTheDocument()
})

test("title is rendered", () => {
  const { queryByTestId } = renderer()

  expect(queryByTestId(ModalTestIds.Title)).toBeInTheDocument()
})
