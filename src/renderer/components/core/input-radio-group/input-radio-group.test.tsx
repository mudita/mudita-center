import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputRadioGroup from "Renderer/components/core/input-radio-group/input-radio-group.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const radioGroup = [
  {
    value: "lala1",
    id: "id1",
  },
  {
    value: "lala2",
    id: "id2",
    label: "label",
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
  const radioInputs = container.querySelectorAll("input")
  expect(radioInputs?.length).toEqual(radioGroup.length)
})

test("renders correct amount of labels", () => {
  const { container } = renderWithThemeAndIntl(
    <InputRadioGroup data={radioGroup} radioGroupName={radioGroupName} />
  )
  const labels = container.querySelectorAll("label")
  expect(labels).toHaveLength(1)
})
