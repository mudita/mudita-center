import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { noop } from "Renderer/utils/noop"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"

test("close button is rendered because modal is closeable by default", () => {
  const closeButtonTestId = "close-modal-button"
  const { getByTestId } = renderWithThemeAndIntl(
    <Modal title={"Title"} size={ModalSize.Medium}>
      <h1>lala</h1>
    </Modal>
  )

  expect(getByTestId(closeButtonTestId)).toBeInTheDocument()
})

test("close button is not rendered when modal is not closable", () => {
  const { container } = renderWithThemeAndIntl(
    <Modal title={"Title"} size={ModalSize.Medium} closeable={false}>
      <h1>lala</h1>
    </Modal>
  )

  const closeButton = container.querySelector("test-file-stub")
  expect(closeButton).not.toBeInTheDocument()
})

test("subtitle is rendered when provided", () => {
  const subTitleText = "Subtitle"
  const { getByText } = renderWithThemeAndIntl(
    <Modal title={"Title"} size={ModalSize.Medium} subtitle={subTitleText}>
      <h1>lala</h1>
    </Modal>
  )
  expect(getByText(subTitleText)).toBeInTheDocument()
})

test("only close button is rendered by default", () => {
  const closeButtonText = "component.modal.closeButton"
  const { getByText } = renderWithThemeAndIntl(
    <Modal title={"Title"} size={ModalSize.Medium} subtitle={"Subtitle"}>
      <h1>lala</h1>
    </Modal>
  )
  expect(getByText(closeButtonText)).toBeInTheDocument()
})

test("action button is rendered when label and onActionButtonClick are provided", () => {
  const modalActionButtonsId = "modal-action-button"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Modal
      title={"Title"}
      size={ModalSize.Medium}
      subtitle={"Subtitle"}
      actionButtonLabel={"Action"}
      onActionButtonClick={noop}
    >
      <h1>lala</h1>
    </Modal>
  )

  expect(getAllByTestId(modalActionButtonsId)).toHaveLength(2)
})

test("action button is not rendered when only label is provided", () => {
  const modalActionButtonsId = "modal-action-button"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Modal
      title={"Title"}
      size={ModalSize.Medium}
      subtitle={"Subtitle"}
      actionButtonLabel={"Action"}
    >
      <h1>lala</h1>
    </Modal>
  )

  expect(getAllByTestId(modalActionButtonsId)).toHaveLength(1)
})

test("action button is not rendered when only onActionButtonClick is provided", () => {
  const modalActionButtonsId = "modal-action-button"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Modal
      title={"Title"}
      size={ModalSize.Medium}
      subtitle={"Subtitle"}
      onActionButtonClick={noop}
    >
      <h1>lala</h1>
    </Modal>
  )

  expect(getAllByTestId(modalActionButtonsId)).toHaveLength(1)
})
