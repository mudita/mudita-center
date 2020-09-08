import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { noop } from "Renderer/utils/noop"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"

const defaultProps = {
  title: "Title",
  size: ModalSize.Medium,
}

const renderer = (extraProps?: any) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Modal {...props}>
      <h1>lala</h1>
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
  const closeButtonText = "component.modal.closeButton"
  const { getByText } = renderer()
  expect(getByText(closeButtonText, { exact: false })).toBeInTheDocument()
  expect(getByText(closeButtonText, { exact: false })).toBeTranslationKey()
})

test("action button is rendered when label and onActionButtonClick are provided", () => {
  const { getAllByTestId } = renderer({
    actionButtonLabel: "Action",
    onActionButtonClick: noop,
  })
  expect(getAllByTestId(ModalTestIds.ModalActionButton)).toHaveLength(2)
})

test("action button is not rendered when only label is provided", () => {
  const { getAllByTestId } = renderer({ actionButtonLabel: "Action" })

  expect(getAllByTestId(ModalTestIds.ModalActionButton)).toHaveLength(1)
})

test("action button is not rendered when only onActionButtonClick is provided", () => {
  const { getAllByTestId } = renderer({ onActionButtonClick: noop })
  expect(getAllByTestId(ModalTestIds.ModalActionButton)).toHaveLength(1)
})

test("custom buttons are rendered", () => {
  const customButtonText = "buttonasda"
  const { getByText } = renderer({
    children: <button>{customButtonText}</button>,
  })
  expect(getByText(customButtonText)).toBeInTheDocument()
})
