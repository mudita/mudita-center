import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { DeleteModalTestIds } from "Renderer/components/core/modal/delete-modal.enum"

const renderer = () => renderWithThemeAndIntl(<DeleteModal />)

test("renders properly", () => {
  const { queryByTestId } = renderer()

  expect(queryByTestId(DeleteModalTestIds.Wrapper)).toBeInTheDocument()
})

test("has content", () => {
  const { queryByTestId } = renderer()

  expect(queryByTestId(DeleteModalTestIds.Content)).toBeInTheDocument()
})
