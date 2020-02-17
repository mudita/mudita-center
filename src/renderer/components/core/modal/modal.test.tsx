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
