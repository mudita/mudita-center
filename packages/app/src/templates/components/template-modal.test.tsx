import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import TemplateModal from "App/templates/components/template-modal.component"
import { fireEvent } from "@testing-library/react"
import { Template } from "App/templates/store/templates.interface"

export const templates: Template[] = [
  {
    id: "123",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "321",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "1233",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "12333",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "123331",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
]

test("correct amount of templates is rendered", () => {
  const { getAllByRole } = renderWithThemeAndIntl(
    <TemplateModal templates={templates} />
  )
  expect(getAllByRole("listitem")).toHaveLength(templates.length)
})

test("template can be selected", () => {
  const selectTemplate = jest.fn()
  const { getAllByText } = renderWithThemeAndIntl(
    <TemplateModal templates={templates} selectTemplate={selectTemplate} />
  )
  const templateElement = getAllByText(templates[0].content)
  fireEvent.click(templateElement[0])
  expect(selectTemplate).toHaveBeenCalled()
  expect(selectTemplate).toHaveBeenCalledTimes(1)
  expect(selectTemplate).toHaveBeenCalledWith(templates[0].id)
})
