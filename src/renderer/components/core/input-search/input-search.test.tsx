import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { fireEvent } from "@testing-library/dom"
import InputSearch, {
  InputSearchProps,
} from "Renderer/components/core/input-search/input-search.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { InputSearchTestIds } from "Renderer/components/core/input-search/input-search-test-ids.enum"
import { basicItems } from "Renderer/components/core/list/list.stories"

const renderInputSelect = ({ ...props }: Partial<InputSearchProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <InputSearch items={basicItems} {...props} />
  )
  return {
    ...outcome,
    input: outcome.getByTestId(InputSearchTestIds.InputText),
    list: outcome.getByTestId(InputSearchTestIds.List),
  }
}

test("focus/blur doesn't toggle the list", () => {
  const { list, input } = renderInputSelect()
  expect(list).not.toBeVisible()
  fireEvent.focus(input)
  expect(list).not.toBeVisible()
})

test("emits an event with correct value", () => {
  const onChange = jest.fn()
  const { input } = renderInputSelect({ onChange })
  const value = basicItems[0].substr(0, 3)
  fireEvent.change(input, {
    target: { value },
  })
  expect(onChange).toBeCalledWith(value)
})

test("emits onChange event after change value in input", () => {
  const onChange = jest.fn()
  const { input } = renderInputSelect({ onChange })
  const value = basicItems[0]
  fireEvent.change(input, {
    target: { value },
  })
  expect(onChange).toBeCalledTimes(1)
})

test("emits onChange event after select the item from hint list", () => {
  const onChange = jest.fn()
  const searchItemValue = basicItems[0]
  const { input, getAllByTestId } = renderInputSelect({
    onChange,
    searchItemValue,
  })
  const listItems = getAllByTestId(InputSearchTestIds.ListItem)

  fireEvent.focus(input)
  fireEvent.mouseDown(listItems[1])
  expect(onChange).toBeCalledTimes(1)
})

test("emits onSelect event after select the item from hint list", () => {
  const onSelect = jest.fn()
  const searchItemValue = basicItems[0]
  const { input, getAllByTestId } = renderInputSelect({
    onSelect,
    searchItemValue,
  })
  const listItems = getAllByTestId(InputSearchTestIds.ListItem)

  fireEvent.focus(input)
  fireEvent.mouseDown(listItems[1])
  expect(onSelect).toBeCalledTimes(1)
})
