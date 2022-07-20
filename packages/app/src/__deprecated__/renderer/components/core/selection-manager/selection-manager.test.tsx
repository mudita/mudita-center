/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { SelectionManagerProps } from "App/__deprecated__/renderer/components/core/selection-manager/selection-manager.interface"
import {
  deleteButton,
  exportButton,
} from "App/__deprecated__/renderer/components/core/selection-manager/selection-manager.stories"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import SelectionManager from "App/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"

const PredefinedSelectionManager = ({
  selectedItemsNumber = 1,
  allItemsSelected = false,
  ...props
}: Partial<SelectionManagerProps>) => {
  return (
    <SelectionManager
      message={{ id: "module.messages.conversationsSelectionsNumber" }}
      selectedItemsNumber={selectedItemsNumber}
      allItemsSelected={allItemsSelected}
      {...props}
    />
  )
}

const renderSelectionManager = (props: Partial<SelectionManagerProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <PredefinedSelectionManager {...props} />
  )
  return {
    ...outcome,
    getWrapper: () => outcome.container.querySelector("section"),
    getCheckbox: () => outcome.getByRole("checkbox"),
    getInfo: () => outcome.getByTestId("info"),
    getButtonsWrapper: () => outcome.queryByTestId("buttons"),
    getButtons: () => outcome.queryAllByTestId("button"),
  }
}

test("has checkbox element", () => {
  const { getCheckbox } = renderSelectionManager()
  expect(getCheckbox()).toBeInTheDocument()
})

test("has info element", () => {
  const { getInfo } = renderSelectionManager()
  expect(getInfo()).toBeInTheDocument()
})

test("has no buttons by default", () => {
  const { getButtonsWrapper, getButtons } = renderSelectionManager()
  expect(getButtonsWrapper()).not.toBeInTheDocument()
  expect(getButtons()).toHaveLength(0)
})

test("render buttons properly", () => {
  const { getButtonsWrapper, getButtons } = renderSelectionManager({
    buttons: [exportButton, deleteButton],
  })
  expect(getButtonsWrapper()).toBeInTheDocument()
  expect(getButtons()).toHaveLength(2)
  expect(getButtons()[0]).toHaveTextContent("Export")
  expect(getButtons()[1]).toHaveTextContent("Delete")
})

test("renders text info for one item properly", () => {
  const { getInfo } = renderSelectionManager({ selectedItemsNumber: 1 })
  expect(getInfo()).toHaveTextContent(
    "module.messages.conversationsSelectionsNumber"
  )
})

test("renders text info for few items properly", () => {
  const { getInfo } = renderSelectionManager({ selectedItemsNumber: 4 })
  expect(getInfo()).toHaveTextContent(
    "module.messages.conversationsSelectionsNumber"
  )
})

test("renders text info for all items properly", () => {
  const { getInfo } = renderSelectionManager({ allItemsSelected: true })
  expect(getInfo()).toHaveTextContent(
    "module.messages.conversationsSelectionsNumber"
  )
})

test("renders indeterminate status properly", () => {
  const { queryByTestId } = renderSelectionManager({ allItemsSelected: false })
  expect(queryByTestId("icon-CheckIndeterminate")).toBeInTheDocument()
})

test("renders indeterminate status properly", () => {
  const { queryByTestId } = renderSelectionManager({ allItemsSelected: true })
  expect(queryByTestId("icon-Check")).toBeInTheDocument()
})

test("renders enlarged selection manager properly", () => {
  const { getWrapper } = renderSelectionManager({
    enlarged: true,
  })
  expect(getWrapper()).toHaveStyleRule("padding-left", "1.4rem")
})
