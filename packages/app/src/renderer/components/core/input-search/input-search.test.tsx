/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputSearch, {
  InputSearchProps,
  InputSearchTestIds,
} from "Renderer/components/core/input-search/input-search.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import { basicItems } from "Renderer/components/core/list/list.stories"

const renderInputSearch = ({ ...props }: Partial<InputSearchProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <InputSearch
      searchValue={"x"}
      onSearchValueChange={jest.fn}
      openSearchResults={jest.fn}
      items={basicItems}
      {...props}
    />
  )
  return {
    ...outcome,
    input: () => outcome.getByRole("textbox"),
    icon: () => outcome.getByTestId(InputSearchTestIds.Icon),
    list: () => outcome.queryByTestId(InputSearchTestIds.List),
    listItems: () => outcome.queryAllByTestId(InputSearchTestIds.ListItem),
    label: () => outcome.container.querySelector("label"),
  }
}

describe("Search input focus/blur", () => {
  test("should toggle the list", () => {
    const { list, input } = renderInputSearch()
    expect(list()).not.toBeVisible()
    input().focus()
    expect(list()).toBeVisible()
    input().blur()
    expect(list()).not.toBeVisible()
  })

  test("should toggle the list properly when min chars to show results are set up", () => {
    const { list, input } = renderInputSearch({
      minCharsToShowResults: 3,
      searchValue: "",
    })
    expect(list()).not.toBeInTheDocument()
    input().focus()
    expect(list()).not.toBeInTheDocument()
  })

  test("shouldn't show the list when min chars is bigger than searchValue length", () => {
    const { list, input } = renderInputSearch({
      minCharsToShowResults: 3,
      searchValue: "ab",
    })
    input().focus()
    expect(list()).not.toBeInTheDocument()
  })

  test("should show the list when min chars is smaller than searchValue length", () => {
    const { list, input } = renderInputSearch({
      minCharsToShowResults: 3,
      searchValue: "abc",
    })
    input().focus()
    expect(list()).toBeInTheDocument()
    expect(list()).toBeVisible()
  })
})

test("Search input arrow click toggles the list", () => {
  const { list, icon } = renderInputSearch()
  expect(list()).not.toBeVisible()
  fireEvent.click(icon())
  expect(list()).toBeVisible()
  fireEvent.click(icon())
  expect(list()).not.toBeVisible()
})

test("select input returns selected list item", () => {
  const onSelect = jest.fn()
  const { listItems } = renderInputSearch({ onSelect })
  fireEvent.click(listItems()[2])
  expect(onSelect).toBeCalledWith(basicItems[2])
})

test("select input resets after selecting empty option", () => {
  const onSelect = jest.fn()
  const { listItems } = renderInputSearch({
    onSelect,
    emptyItemValue: "empty",
  })
  expect(listItems()[0]).toHaveTextContent("empty")
  fireEvent.click(listItems()[0])
  expect(onSelect).toBeCalledWith("")
})

test("Item marked as disabled in `disabledOptions` list should have a `disabled` attribute", () => {
  const { listItems } = renderInputSearch({
    disabledItems: [basicItems[0]],
  })
  expect(listItems()[0]).toHaveStyleRule("cursor", "not-allowed")
  expect(listItems()[1]).not.toHaveStyleRule("cursor", "not-allowed")
})

test("labels color is transparent with initiallTransparentBorder prop", () => {
  const { label } = renderInputSearch({ initialTransparentBorder: true })
  expect(label()).toHaveStyleRule("border-color", "transparent")
})

test("select input by enter returns selected list item", () => {
  const onSelect = jest.fn()
  const { input } = renderInputSearch({ onSelect })
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
  expect(onSelect).toBeCalledWith(basicItems[0])
})

test("Enter on search input should open search results", () => {
  const openSearchResults = jest.fn()
  const { input } = renderInputSearch({ openSearchResults })
  fireEvent.keyDown(input(), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  })
  expect(openSearchResults).toBeCalled()
})

test("Open search results should close search dropdown list", () => {
  const { input, list } = renderInputSearch()
  fireEvent.keyDown(input(), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  })
  expect(list()).not.toBeVisible()
})

test("select last list item by enter returns last selected list item", () => {
  const onSelect = jest.fn()
  const mockItems = ["1", "2"]
  const { input } = renderInputSearch({ onSelect, items: mockItems })

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
  const { input, listItems } = renderInputSearch({ onSelect })
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
  const { input, listItems } = renderInputSearch({ onSelect })
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
