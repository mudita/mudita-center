/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { TemplatesList } from "App/templates/components/templates-list/templates-list.component"
import { TemplatesListProps } from "App/templates/components/templates-list/templates-list.interface"
import { Template } from "App/templates/dto"

const templateMock: Template = {
  id: "1",
  text: "Thanks for reaching out",
  lastUsedAt: "2020-02-12T10:00:00.000Z",
  order: 1,
}

const render = (props: TemplatesListProps) => {
  return renderWithThemeAndIntl(<TemplatesList {...props} />)
}

describe("`TemplatesList` component", () => {
  test("shows empty state if templates list is empty", () => {
    const { getByText } = render({
      templates: [],
      deleteTemplates: jest.fn(),
      updateTemplate: jest.fn(),
      getRowStatus: jest
        .fn()
        .mockReturnValue({ indeterminate: false, selected: false }),
      noneRowsSelected: true,
      toggleRow: jest.fn(),
      onDragEnd: jest.fn(),
      active: undefined,
      templateFormOpen: false,
    })
    expect(
      getByText("[value] module.templates.emptyList.title")
    ).toBeInTheDocument()
    expect(
      getByText("[value] module.templates.emptyList.description")
    ).toBeInTheDocument()
  })

  test("shows templates list", () => {
    const { getByText } = render({
      templates: [templateMock],
      deleteTemplates: jest.fn(),
      updateTemplate: jest.fn(),
      getRowStatus: jest
        .fn()
        .mockReturnValue({ indeterminate: false, selected: false }),
      noneRowsSelected: true,
      toggleRow: jest.fn(),
      onDragEnd: jest.fn(),
      active: undefined,
      templateFormOpen: false,
    })
    expect(getByText(templateMock.text)).toBeInTheDocument()
  })

  test("shows checkbox if at least one row is selected", () => {
    const { getByTestId } = render({
      templates: [templateMock],
      deleteTemplates: jest.fn(),
      updateTemplate: jest.fn(),
      getRowStatus: jest
        .fn()
        .mockReturnValue({ indeterminate: false, selected: false }),
      noneRowsSelected: false,
      toggleRow: jest.fn(),
      onDragEnd: jest.fn(),
      active: undefined,
      templateFormOpen: false,
    })
    expect(getByTestId("template-checkbox")).toBeVisible()
  })
})
