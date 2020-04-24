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

test("changeValue is called", () => {
  const changeValue = jest.fn()
  const { container } = renderWithThemeAndIntl(
    <AudioConversionRadioGroup
      radioButtonsData={convertRadioGroup}
      radioGroupName={"example name"}
      changeValue={changeValue}
    />
  )
  const inputs = container.querySelectorAll('[type="radio"]')
  fireEvent.click(inputs[0], { value: "cos" })
  expect(changeValue).toHaveBeenCalled()
})

test("onChangeValue is called", () => {
  const changeValue = jest.fn()
  const onChangeValue = jest.fn()
  const valueToBeCalledWith = "cos"
  const { container } = renderWithThemeAndIntl(
    <AudioConversionRadioGroup
      radioValue={valueToBeCalledWith}
      radioButtonsData={convertRadioGroup}
      radioGroupName={"example name"}
      changeValue={changeValue}
      onChangeValue={onChangeValue}
    />
  )
  const inputs = container.querySelectorAll('[type="radio"]')
  fireEvent.click(inputs[0], { value: "lala" })
  expect(onChangeValue).toHaveBeenCalled()
  expect(onChangeValue).toHaveBeenCalledWith(valueToBeCalledWith)
})
