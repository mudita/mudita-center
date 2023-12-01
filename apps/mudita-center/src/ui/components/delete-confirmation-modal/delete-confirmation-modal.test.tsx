/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeleteConfirmationModal } from "App/ui/components/delete-confirmation-modal"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"
import { noop } from "../../../__deprecated__/renderer/utils/noop"

type Props = ComponentProps<typeof DeleteConfirmationModal>

const renderModal = (extraProps?: Partial<Props>) => {
  const props = {
    info: { id: "Info Message" },
    open: true,
    cancelButtonLabel: "cancelButtonLabel mock",
    actionButtonLabel: "actionButtonLabel mock",
    titleLabel: "titleLabel mock",
    onActionButtonClick: noop,
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

  test("labels are passed to modal properly", () => {
    const { getByText } = renderModal()
    expect(getByText("cancelButtonLabel mock")).toBeInTheDocument()
    expect(getByText("actionButtonLabel mock")).toBeInTheDocument()
    expect(getByText("titleLabel mock")).toBeInTheDocument()
  })
})
