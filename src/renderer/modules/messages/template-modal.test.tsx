import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import TemplateModal from "Renderer/modules/messages/template-modal.component"

test("correct amount of templates is rendered", () => {
  const templates = ["ads", "123", "erqwrqww"]
  const { getAllByTestId } = renderWithThemeAndIntl(
    <TemplateModal templates={templates} />
  )
  expect(getAllByTestId("template-element")).toHaveLength(templates.length)
})
