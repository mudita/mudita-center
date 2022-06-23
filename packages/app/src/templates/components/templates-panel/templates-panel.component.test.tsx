/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { TemplatesPanel } from "App/templates/components/templates-panel/templates-panel.component"
import { TemplatesPanelProps } from "App/templates/components/templates-panel/templates-panel.interface"
import { TemplatesPanelTestIds } from "App/templates/components/templates-panel/templates-panel-ids.enum"
import { Template } from "App/templates/dto"

const templateMock: Template = {
  id: "1",
  text: "Thanks for reaching out. I can't talk right now, I'll call you later",
  lastUsedAt: "2020-02-12T10:00:00.000Z",
  order: 1,
}

const onAddNewTemplateMock = jest.fn()
const onDeleteClick = jest.fn()

const render = (props: TemplatesPanelProps) => {
  return renderWithThemeAndIntl(<TemplatesPanel {...props} />)
}

describe("`TemplatesPanel` component", () => {
  describe("button `disabled` state", () => {
    test("button is disabled when `disabled` prop is equal to `true`", () => {
      const { getByTestId } = render({
        disabled: true,
        onAddNewTemplate: onAddNewTemplateMock,
        onDeleteClick: onDeleteClick,
        selectedTemplates: [],
      })
      const button = getByTestId(TemplatesPanelTestIds.Button)

      expect(button).toBeDisabled()
    })

    test("button isn't disabled when `disabled` prop is equal to `false`", () => {
      const { getByTestId } = render({
        disabled: false,
        onAddNewTemplate: onAddNewTemplateMock,
        onDeleteClick: onDeleteClick,
        selectedTemplates: [],
      })
      const button = getByTestId(TemplatesPanelTestIds.Button)

      expect(button).toBeEnabled()
    })
  })

  describe("button `onClick`", () => {
    test("onClick action calls `onAddNewTemplate` callback", () => {
      const { getByTestId } = render({
        disabled: false,
        onAddNewTemplate: onAddNewTemplateMock,
        onDeleteClick: onDeleteClick,
        selectedTemplates: [],
      })
      const button = getByTestId(TemplatesPanelTestIds.Button)

      expect(onAddNewTemplateMock).toHaveBeenCalledTimes(0)
      fireEvent.click(button)
      expect(onAddNewTemplateMock).toHaveBeenCalledTimes(1)
    })
  })
  test("selection manager is displayed when there is at least one template selected", () => {
    const { getByTestId } = render({
      disabled: false,
      onAddNewTemplate: onAddNewTemplateMock,
      onDeleteClick: onDeleteClick,
      selectedTemplates: [templateMock],
    })
    expect(
      getByTestId(TemplatesPanelTestIds.SelectionManager)
    ).toBeInTheDocument()
  })
})
