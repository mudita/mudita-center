/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { TemplatesPanel } from "App/templates/components/templates-panel/templates-panel.component"
import { TemplatesPanelProps } from "App/templates/components/templates-panel/templates-panel.interface"
import { TemplatesPanelTestIds } from "App/templates/components/templates-panel/templates-panel-ids.enum"

const onAddNewTemplateMock = jest.fn()

const render = (props: TemplatesPanelProps) => {
  return renderWithThemeAndIntl(<TemplatesPanel {...props} />)
}

describe("`TemplatesPanel` component", () => {
  describe("button `disabled` state", () => {
    test("button is disabled when `disabled` prop is equal to `true`", () => {
      const { getByTestId } = render({
        disabled: true,
        onAddNewTemplate: onAddNewTemplateMock,
      })
      const button = getByTestId(TemplatesPanelTestIds.Button)

      expect(button).toBeDisabled()
    })

    test("button isn't disabled when `disabled` prop is equal to `false`", () => {
      const { getByTestId } = render({
        disabled: false,
        onAddNewTemplate: onAddNewTemplateMock,
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
      })
      const button = getByTestId(TemplatesPanelTestIds.Button)

      expect(onAddNewTemplateMock).toHaveBeenCalledTimes(0)
      fireEvent.click(button)
      expect(onAddNewTemplateMock).toHaveBeenCalledTimes(1)
    })
  })
})
