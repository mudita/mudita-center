import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import React from "react"
import { SelectionManagerProps } from "Renderer/components/core/selection-manager/selection-manager.interface"
import {
  deleteButton,
  exportButton,
  PredefinedSelectionManager,
} from "Renderer/components/core/selection-manager/selection-manager.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

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

test("matches snapshot", () => {
  const { container } = renderSelectionManager()
  expect(container).toMatchSnapshot()
})

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
  expect(getInfo()).toHaveTextContent("1 Conversation selected")
})

test("renders text info for few items properly", () => {
  const { getInfo } = renderSelectionManager({ selectedItemsNumber: 4 })
  expect(getInfo()).toHaveTextContent("4 Conversations selected")
})

test("renders text info for all items properly", () => {
  const { getInfo } = renderSelectionManager({ allItemsSelected: true })
  expect(getInfo()).toHaveTextContent("All Conversations selected")
})

test("renders indeterminate status properly", () => {
  const { queryByTestId } = renderSelectionManager({ allItemsSelected: false })
  expect(queryByTestId("state-indeterminate")).toBeInTheDocument()
})

test("renders indeterminate status properly", () => {
  const { queryByTestId } = renderSelectionManager({ allItemsSelected: true })
  expect(queryByTestId("state-checked")).toBeInTheDocument()
})

test("renders expanded selection manager properly", () => {
  const { getWrapper, getCheckbox } = renderSelectionManager({ enlarged: true })
  expect(getWrapper()).toHaveStyleRule("padding-left", "1.4rem")
  expect(getCheckbox()).toHaveStyleRule("height", "2rem")
})
