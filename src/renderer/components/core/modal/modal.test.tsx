import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Modal, {
  ModalSize,
} from "Renderer/components/core/modal/modal.component"

test("close button is rendered", () => {
  const { container } = renderWithThemeAndIntl(
    <Modal title={"Title"} size={ModalSize.Medium}>
      <h1>lala</h1>
    </Modal>
  )

  const closeButton = container.querySelector("test-file-stub")
  expect(closeButton).toBeInTheDocument()
})

test("close button is not rendered", () => {
  const { container } = renderWithThemeAndIntl(
    <Modal title={"Title"} size={ModalSize.Medium} closeable={false}>
      <h1>lala</h1>
    </Modal>
  )

  const closeButton = container.querySelector("test-file-stub")
  expect(closeButton).not.toBeInTheDocument()
})

test("subtitle is rendered", () => {
  const subTitleText = "Subtitle"
  const { getByText } = renderWithThemeAndIntl(
    <Modal title={"Title"} size={ModalSize.Medium} subtitle={subTitleText}>
      <h1>lala</h1>
    </Modal>
  )
  expect(getByText(subTitleText)).toBeInTheDocument()
})

test("only close button is rendered", () => {
  const closeButtonText = "Close"
  const { getByText } = renderWithThemeAndIntl(
    <Modal title={"Title"} size={ModalSize.Medium} subtitle={"Subtitle"}>
      <h1>lala</h1>
    </Modal>
  )
  expect(getByText(closeButtonText)).toBeInTheDocument()
})

test("close button and action button is rendered", () => {
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

  expect(getAllByTestId(modalActionButtonsId)).toHaveLength(2)
})
