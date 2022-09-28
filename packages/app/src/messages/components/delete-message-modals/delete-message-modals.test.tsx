/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeleteMessageModals from "App/messages/components/delete-message-modals/delete-message-modals.component"
import { DeleteMessageModalsTestIds } from "App/messages/components/delete-message-modals/delete-message-modals-test-ids.enum"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"

type Props = ComponentProps<typeof DeleteMessageModals>

const props: Props = {
  error: null,
  deleting: false,
  deletingConfirmation: false,
  onCloseDeletingErrorModal: jest.fn(),
  onDelete: jest.fn(),
  onCloseDeletingModal: jest.fn(),
}

const renderer = (extraProps?: Partial<Props>) => {
  return renderWithThemeAndIntl(
    <DeleteMessageModals {...props} {...extraProps} />
  )
}

describe("when deleting state is empty and delete  message confirmation is not supposed to be opened", () => {
  test("all modals are not shown", () => {
    const { queryByTestId } = renderer()

    expect(
      queryByTestId(DeleteMessageModalsTestIds.DeleteMessageConfirmation)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteMessageModalsTestIds.FailMessageDelete)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteMessageModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
  })
})

describe("when delete message confirmation is supposed to be opened", () => {
  test("the modal is shown", () => {
    const { queryByTestId } = renderer({
      deletingConfirmation: true,
    })

    expect(
      queryByTestId(DeleteMessageModalsTestIds.DeleteMessageConfirmation)
    ).toBeInTheDocument()
  })
})

describe("when deleting state equals to true", () => {
  test("only the loading modal is shown", () => {
    const { queryByTestId } = renderer({
      deletingConfirmation: false,
      deleting: true,
    })

    expect(
      queryByTestId(DeleteMessageModalsTestIds.FailMessageDelete)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteMessageModalsTestIds.LoadingModal)
    ).toBeInTheDocument()
  })
  test("only the fail modal is shown while error", () => {
    const { queryByTestId } = renderer({
      deletingConfirmation: false,
      deleting: true,
      error: "Luke, I'm your error",
    })

    expect(
      queryByTestId(DeleteMessageModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteMessageModalsTestIds.FailMessageDelete)
    ).toBeInTheDocument()
  })
})
