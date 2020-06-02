import "@testing-library/jest-dom/extend-expect"
import { fireEvent } from "@testing-library/dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Templates, {
  TemplatesProps,
} from "Renderer/modules/messages/tabs/templates.component"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import "intersection-observer"

const renderTemplates = ({
  onDeleteButtonClick = noop,
  onNewButtonClick = noop,
  onSearchTermChange = noop,
}: Partial<TemplatesProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Templates
      onDeleteButtonClick={onDeleteButtonClick}
      onNewButtonClick={onNewButtonClick}
      onSearchTermChange={onSearchTermChange}
    />
  )
  return {
    ...outcome,
    getInput: () => outcome.getByRole("searchbox") as HTMLInputElement,
    getButtons: () => outcome.getAllByRole("button") as HTMLButtonElement[],
    newTemplateButton: outcome.getByText(
      intl.formatMessage(messages.newButton)
    ),
  }
}

test("renders new template button properly", () => {
  const { newTemplateButton } = renderTemplates()
  expect(newTemplateButton).toBeInTheDocument()
})

test("renders search input properly", () => {
  const { getInput } = renderTemplates()
  expect(getInput().placeholder).toEqual(
    intl.formatMessage(messages.searchPlaceholder)
  )
})

test("calls proper action after new template button click", () => {
  const onClick = jest.fn()
  const { newTemplateButton } = renderTemplates({ onNewButtonClick: onClick })
  fireEvent.click(newTemplateButton)
  expect(onClick).toBeCalled()
})
