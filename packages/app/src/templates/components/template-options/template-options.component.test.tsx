/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { TemplateOptions } from "App/templates/components/template-options/template-options.component"
import { TemplateOptionsProps } from "App/templates/components/template-options/template-options.interface"
import { TemplateOptionsTestIds } from "App/templates/components/template-options/template-options-test-ids.enum"

const propsMock: TemplateOptionsProps = {
  templateId: "1",
  onDelete: jest.fn(),
  onUpdate: jest.fn(),
}

const render = (props: TemplateOptionsProps) => {
  return renderWithThemeAndIntl(<TemplateOptions {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `TemplateOptions`", () => {
  test("opens dropdown on click", () => {
    const { getByTestId, queryByTestId } = render(propsMock)

    expect(
      queryByTestId(TemplateOptionsTestIds.DeleteButton)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(TemplateOptionsTestIds.EditButton)
    ).not.toBeInTheDocument()

    fireEvent.click(getByTestId(TemplateOptionsTestIds.DropdownToggler))

    expect(getByTestId(TemplateOptionsTestIds.DeleteButton)).toBeInTheDocument()
    expect(getByTestId(TemplateOptionsTestIds.EditButton)).toBeInTheDocument()
  })

  test("triggered `onDelete` action when clicks on delete button", () => {
    const { getByTestId } = render(propsMock)

    fireEvent.click(getByTestId(TemplateOptionsTestIds.DropdownToggler))

    const deleteButton = getByTestId(TemplateOptionsTestIds.DeleteButton)

    expect(propsMock.onDelete).not.toBeCalled()

    fireEvent.click(deleteButton)

    expect(propsMock.onDelete).toHaveBeenCalledWith([propsMock.templateId])
  })

  test("triggered `onUpdate` action when clicks on edit button", () => {
    const { getByTestId } = render(propsMock)

    fireEvent.click(getByTestId(TemplateOptionsTestIds.DropdownToggler))

    const editButton = getByTestId(TemplateOptionsTestIds.EditButton)

    expect(propsMock.onUpdate).not.toBeCalled()

    fireEvent.click(editButton)

    expect(propsMock.onUpdate).toHaveBeenCalledWith(propsMock.templateId)
  })
})
