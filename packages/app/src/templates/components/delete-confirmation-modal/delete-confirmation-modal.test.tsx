/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { DeleteConfirmationModal } from "App/templates/components/delete-confirmation-modal"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"

type Props = ComponentProps<typeof DeleteConfirmationModal>

const renderModal = (extraProps?: Partial<Props>) => {
  const props = {
    info: { id: "Info Message" },
    open: true,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<DeleteConfirmationModal {...props} />)
}

describe("Delete Confirmation Modal", () => {
  test("should render icon properly", () => {
    const { getByTestId } = renderModal()
    expect(getByTestId("icon-delete")).toBeInTheDocument()
  })

  test("info is passed to modal properly", () => {
    const { getByText } = renderModal()
    expect(getByText("Info Message")).toBeInTheDocument()
  })
})
