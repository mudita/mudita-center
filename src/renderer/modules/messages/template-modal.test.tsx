import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import TemplateModal from "Renderer/modules/messages/template-modal.component"
import { fireEvent } from "@testing-library/react"
import { mockedTemplateData } from "Renderer/modules/messages/__mocks__/template-modal-data"

test("correct amount of templates is rendered", () => {
  const { getAllByRole } = renderWithThemeAndIntl(
    <TemplateModal templates={mockedTemplateData} />
  )
  expect(getAllByRole("listitem")).toHaveLength(mockedTemplateData.length)
})

test("template can be selected", () => {
  const selectTemplate = jest.fn()
  const { getAllByText } = renderWithThemeAndIntl(
    <TemplateModal
      templates={mockedTemplateData}
      selectTemplate={selectTemplate}
    />
  )
  const templateElement = getAllByText(mockedTemplateData[0].content)
  fireEvent.click(templateElement[0])
  expect(selectTemplate).toHaveBeenCalled()
  expect(selectTemplate).toHaveBeenCalledTimes(1)
  expect(selectTemplate).toHaveBeenCalledWith(mockedTemplateData[0].id)
})
