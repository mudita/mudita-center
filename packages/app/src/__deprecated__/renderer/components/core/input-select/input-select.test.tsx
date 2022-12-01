/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputSelect, {
  InputSelectProps,
  InputSelectTestIds,
} from "App/__deprecated__/renderer/components/core/input-select/input-select.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import { basicItems } from "App/__deprecated__/renderer/components/core/list/list.stories"

const renderInputSelect = ({ ...props }: Partial<InputSelectProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <InputSelect items={basicItems} {...props} />
  )
  return {
    ...outcome,
    input: () => outcome.getByRole("textbox"),
    icon: () => outcome.getByTestId(InputSelectTestIds.Icon),
    list: () => outcome.queryByTestId(InputSelectTestIds.List),
    listItems: () => outcome.queryAllByTestId(InputSelectTestIds.ListItem),
    label: () => outcome.container.querySelector("label"),
  }
}

test("select input focus/blur toggles the list", () => {
  const { list, input } = renderInputSelect()
  expect(list()).not.toBeVisible()
  input().focus()
  expect(list()).toBeVisible()
  input().blur()
  expect(list()).not.toBeVisible()
})

test("select input focus/blur toggles the list properly when min chars to show results are set up", () => {
  const { list, input } = renderInputSelect({ minCharsToShowResults: 3 })
  expect(list()).not.toBeInTheDocument()
  input().focus()
  expect(list()).not.toBeInTheDocument()
  fireEvent.change(input(), { target: { value: "ap" } })
  expect(list()).not.toBeInTheDocument()
  fireEvent.change(input(), { target: { value: "app" } })
  expect(list()).toBeInTheDocument()
  expect(list()).toBeVisible()
})

test("select input arrow click toggles the list", () => {
  const { list, icon } = renderInputSelect()
  expect(list()).not.toBeVisible()
  fireEvent.click(icon())
  expect(list()).toBeVisible()
  fireEvent.click(icon())
  expect(list()).not.toBeVisible()
})

test("select input returns selected list item", () => {
  const onSelect = jest.fn()
  const { listItems } = renderInputSelect({ onSelect })
  fireEvent.click(listItems()[2])
  expect(onSelect).toBeCalledWith(basicItems[2])
})

test("select input resets after selecting empty option", () => {
  const onSelect = jest.fn()
  const { listItems } = renderInputSelect({
    onSelect,
    emptyItemValue: "empty",
  })
  expect(listItems()[0]).toHaveTextContent("empty")
  fireEvent.click(listItems()[0])
  expect(onSelect).toBeCalledWith("")
})

test("Item marked as disabled in `disabledOptions` list should have a `disabled` attribute", () => {
  const { listItems } = renderInputSelect({
    disabledItems: [basicItems[0]],
  })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(listItems()[0]).toHaveStyleRule("cursor", "not-allowed")
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(listItems()[1]).not.toHaveStyleRule("cursor", "not-allowed")
})

test("labels color is transparent with initiallTransparentBorder prop", () => {
  const { label } = renderInputSelect({ initialTransparentBorder: true })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(label()).toHaveStyleRule("border-color", "transparent")
})

test("select input by enter returns selected list item", () => {
  const onSelect = jest.fn()
  const { input } = renderInputSelect({ onSelect })
  fireEvent.keyDown(input(), {
    key: "ArrowDown",
    code: "ArrowDown",
    keyCode: 40,
    charCode: 40,
  })
  fireEvent.keyDown(input(), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  })
  expect(onSelect).toBeCalledWith(basicItems[1])
})

test("select first list item by enter returns first selected list item", () => {
  const onSelect = jest.fn()
  const { input } = renderInputSelect({ onSelect })
  fireEvent.keyDown(input(), {
    key: "ArrowUp",
    code: "ArrowUp",
    keyCode: 38,
    charCode: 38,
  })
  fireEvent.keyDown(input(), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  })
  expect(onSelect).toBeCalledWith(basicItems[0])
})

test("select last list item by enter returns last selected list item", () => {
  const onSelect = jest.fn()
  const mockItems = ["1", "2"]
  const { input } = renderInputSelect({ onSelect, items: mockItems })

  fireEvent.keyDown(input(), {
    key: "ArrowDown",
    code: "ArrowDown",
    keyCode: 40,
    charCode: 40,
  })

  fireEvent.keyDown(input(), {
    key: "ArrowDown",
    code: "ArrowDown",
    keyCode: 40,
    charCode: 40,
  })
  fireEvent.keyDown(input(), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  })
  expect(onSelect).toBeCalledWith(mockItems[1])
})

test("select list item by enter when hovering on the list", () => {
  const onSelect = jest.fn()
  const { input, listItems } = renderInputSelect({ onSelect })
  fireEvent.mouseOver(listItems()[2])
  fireEvent.keyDown(input(), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  })
  expect(onSelect).toBeCalledWith(basicItems[2])
})

test("select list item by enter when hovering on the list and navigate on keyboard", () => {
  const onSelect = jest.fn()
  const { input, listItems } = renderInputSelect({ onSelect })
  fireEvent.keyDown(input(), {
    key: "ArrowDown",
    code: "ArrowDown",
  })
  fireEvent.mouseOver(listItems()[5])
  fireEvent.keyDown(input(), {
    key: "ArrowUp",
    code: "ArrowUp",
    keyCode: 38,
    charCode: 38,
  })
  fireEvent.keyDown(input(), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  })
  expect(onSelect).toBeCalledWith(basicItems[4])
})
