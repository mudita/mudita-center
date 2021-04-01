import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"

const renderer = (props = {}) =>
  renderWithThemeAndIntl(<ModalDialog isOpen={true} {...props} />)

test("close button is hidden by default", () => {
  const {queryByTestId} = renderer()
  expect(queryByTestId(ModalTestIds.CloseButton)).not.toBeInTheDocument()
})

test("close button performs close modal action", () => {
  const closeModal = jest.fn()
  const {getByTestId} = renderer({closeModal})
  getByTestId(ModalTestIds.CloseButton).click()
  expect(closeModal).toBeCalled()
})
