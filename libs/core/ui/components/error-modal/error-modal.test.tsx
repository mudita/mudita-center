/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import ErrorModal from "Core/ui/components/error-modal/error-modal.component"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ModalTestIds } from "Core/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

type Props = ComponentProps<typeof ErrorModal>

const renderModal = (extraProps?: Partial<Props>) => {
  const props = {
    title: "Title",
    open: true,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ErrorModal {...props} />)
}

test("title is passed to modal properly", () => {
  const { getByTestId } = renderModal()
  expect(getByTestId(ModalTestIds.Header)).toHaveTextContent("Title")
})

test("proper icon is rendered", () => {
  const { getByTestId } = renderModal()
  expect(getByTestId("icon-ThinFail")).toBeInTheDocument()
})

test("subtitle is passed to modal properly", () => {
  const { getByText } = renderModal({ subtitle: "Subtitle" })
  expect(getByText("Subtitle")).toBeInTheDocument()
})

test("subtitle is passed to modal properly", () => {
  const { getByText } = renderModal({ body: "Body" })
  expect(getByText("Body")).toBeInTheDocument()
})
