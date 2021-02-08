import React from "react"
import ErrorModal from "App/contacts/components/error-modal/error-modal.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { ErrorModalProps } from "App/contacts/components/error-modal/error-modal.interface"

const renderModal = (extraProps?: Partial<ErrorModalProps>) => {
  const props = {
    title: "Title",
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ErrorModal {...props} />)
}

test("title is passed to modal properly", () => {
  const { getByTestId } = renderModal()
  expect(getByTestId(ModalTestIds.Header)).toHaveTextContent("Title")
})

test("proper icon is rendered", () => {
  const { getByTestId } = renderModal()
  expect(getByTestId("icon-Fail")).toBeInTheDocument()
})

test("subtitle is passed to modal properly", () => {
  const { getByText } = renderModal({ subtitle: "Subtitle" })
  expect(getByText("Subtitle")).toBeInTheDocument()
})

test("subtitle is passed to modal properly", () => {
  const { getByText } = renderModal({ body: "Body" })
  expect(getByText("Body")).toBeInTheDocument()
})
