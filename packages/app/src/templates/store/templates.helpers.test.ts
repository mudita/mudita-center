import { filterTemplates } from "App/templates/store/templates.helpers"
import { removeNewLinesFromString } from "Renderer/utils/remove-new-lines-from-string"
import { Template } from "App/templates/store/templates.interface"

const mockedTemplateData: Template[] = [
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
