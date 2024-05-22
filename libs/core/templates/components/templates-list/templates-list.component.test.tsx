/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { TemplatesList } from "Core/templates/components/templates-list/templates-list.component"
import { Template } from "Core/templates/dto"

type Props = ComponentProps<typeof TemplatesList>

const defaultProps: Props = {
  deleteTemplates: jest.fn(),
  updateTemplate: jest.fn(),
  templateReordered: jest.fn(),
  activeTemplate: undefined,
  templateFormOpen: false,
  selectedTemplateIds: [],
}

const templateMock: Template = {
  id: "1",
  text: "Thanks for reaching out",
  lastUsedAt: "2020-02-12T10:00:00.000Z",
  order: 1,
}

const render = (extraProps?: Partial<Props>, state?: ReduxRootState) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <TemplatesList {...props} />
    </Provider>
  )
}

describe("`TemplatesList` component", () => {
  test("shows empty state if templates list is empty", () => {
    const { getByText } = render({}, {
      templates: {
        data: [],
      },
    } as unknown as ReduxRootState)
    expect(
      getByText("[value] module.templates.emptyList.title")
    ).toBeInTheDocument()
    expect(
      getByText("[value] module.templates.emptyList.description")
    ).toBeInTheDocument()
  })

  test("shows templates list", () => {
    const { getByText } = render({}, {
      templates: {
        data: [templateMock],
      },
    } as ReduxRootState)
    expect(getByText(templateMock.text)).toBeInTheDocument()
  })

  test("shows checkbox if at least one row is selected", () => {
    const { getByTestId } = render(
      {
        selectedTemplateIds: [templateMock.id],
      },
      {
        templates: {
          data: [templateMock],
        },
      } as ReduxRootState
    )
    expect(getByTestId("template-checkbox")).toBeVisible()
  })
})
