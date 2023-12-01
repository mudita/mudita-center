/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { Template } from "App/templates/dto"
import {
  TemplatesSelectModal,
  TemplatesSelectModalProps,
} from "App/templates/components/templates-select-modal"
import { TemplatesSelectModalTestIds } from "App/templates/components/templates-select-modal/templates-select-modal-test-ids.enum"

const templates: Template[] = [
  {
    id: "1",
    text: "First test template",
    lastUsedAt: "1574335694",
    order: 1,
  },
  {
    id: "2",
    text: "Second test template",
    lastUsedAt: "1574335694",
    order: 2,
  },
  {
    id: "3",
    text: "Third test template",
    lastUsedAt: "1574335694",
    order: 3,
  },
]

const render = (props: TemplatesSelectModalProps) => {
  return renderWithThemeAndIntl(<TemplatesSelectModal {...props} />)
}

const onSelect = jest.fn()
const onClose = jest.fn()

describe("TemplatesSelectModal", () => {
  test("is closed when `open` field is equal to `false`", () => {
    const { queryByTestId } = render({
      onClose,
      onSelect,
      open: false,
      templates: templates,
    })

    expect(
      queryByTestId(TemplatesSelectModalTestIds.TemplatesList)
    ).not.toBeInTheDocument()
  })

  test("is open when `open` field is equal to `true`", () => {
    const { queryByTestId } = render({
      onClose,
      onSelect,
      open: true,
      templates: templates,
    })

    expect(
      queryByTestId(TemplatesSelectModalTestIds.TemplatesList)
    ).toBeInTheDocument()
  })

  test("calls `onClose` action when user click on close button", () => {
    const { getByTestId, queryByTestId } = render({
      onClose,
      onSelect,
      open: true,
      templates: templates,
    })

    const closeButton = getByTestId(ModalTestIds.CloseButton)

    expect(
      queryByTestId(TemplatesSelectModalTestIds.TemplatesList)
    ).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(0)

    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test("shows all templates that user can choose", () => {
    const { getAllByTestId } = render({
      onClose,
      onSelect,
      open: true,
      templates: templates,
    })

    expect(
      getAllByTestId(TemplatesSelectModalTestIds.TemplatesRow)
    ).toHaveLength(templates.length)
  })
})
