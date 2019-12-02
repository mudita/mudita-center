import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputRadioGroup from "Renderer/components/input-radio-group/input-radio-group.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const radioGroup = [
  {
    value: "lala1",
    id: "id1",
  },
  {
    value: "lala2",
    id: "id2",
  },
  {
    value: "lala2",
    id: "id3",
  },
  {
    value: "lala2",
    id: "id4",
  },
]

const radioGroupName = "example"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <InputRadioGroup data={radioGroup} radioGroupName={radioGroupName} />
  )
  expect(container).toMatchSnapshot()
})
test("renders correct amount of radio inputs", () => {
  const { container } = renderWithThemeAndIntl(
    <InputRadioGroup data={radioGroup} radioGroupName={radioGroupName} />
  )
  const radioInputs = container?.firstChild?.childNodes
  expect(radioInputs?.length).toEqual(radioGroup.length)
})
