import { filterTemplates } from "Renderer/models/templates/filter-templates"
import { mockedTemplateData } from "Renderer/modules/messages/__mocks__/template-modal-data"

test("finds correct template", () => {
  const searchValue = mockedTemplateData[0].text
  expect(filterTemplates(mockedTemplateData, searchValue)).toHaveLength(1)
})

test("finds correct template with new line", () => {
  const searchValue = mockedTemplateData[0].text + "\n"
  expect(filterTemplates(mockedTemplateData, searchValue)).toHaveLength(1)
})

test("does not match any template", () => {
  const searchValue = "adasdaldkoa"
  expect(filterTemplates(mockedTemplateData, searchValue)).toHaveLength(0)
})
