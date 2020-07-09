import { filterTemplates } from "Renderer/models/templates/filter-templates"
import { mockedTemplateData } from "Renderer/modules/messages/__mocks__/template-modal-data"
import { removeNewLinesFromString } from "Renderer/utils/remove-new-lines-from-string"

test("finds correct template", () => {
  const searchValue = mockedTemplateData[0].content
  expect(filterTemplates(mockedTemplateData, searchValue)).toHaveLength(1)
})

test("finds correct template with new line", () => {
  const searchValue = mockedTemplateData[0].content + "\n"
  expect(filterTemplates(mockedTemplateData, searchValue)).toHaveLength(1)
})

test("finds correct template for strings with ignored white spaces", () => {
  const searchValueWithoutWhiteSpaces = removeNewLinesFromString(
    mockedTemplateData[0].content
  )
  expect(
    filterTemplates(mockedTemplateData, searchValueWithoutWhiteSpaces)
  ).toHaveLength(1)
})

test("does not match any template", () => {
  const searchValue = "adasdaldkoa"
  expect(filterTemplates(mockedTemplateData, searchValue)).toHaveLength(0)
})
