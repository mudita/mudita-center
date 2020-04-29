import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import AudioConversionRadioGroup from "Renderer/components/rest/settings/audio-conversion-radio-group.component"
import { fireEvent } from "@testing-library/dom"

const convertRadioGroup = [
  {
    value: "Always ask",
    id: "id1",
    label: "Label1",
  },
  {
    value: "Convert automatically",
    id: "id2",
    label: "Label2",
  },
]

test("Informs consumer about the change", () => {
  const onChange = jest.fn()
  const { container } = renderWithThemeAndIntl(
    <AudioConversionRadioGroup
      radioButtonsData={convertRadioGroup}
      radioGroupName={"example name"}
      onChange={onChange}
    />
  )
  const inputs = container.querySelectorAll('[type="radio"]')
  fireEvent.click(inputs[0], { value: "cos" })
  expect(onChange).toHaveBeenCalled()
})
