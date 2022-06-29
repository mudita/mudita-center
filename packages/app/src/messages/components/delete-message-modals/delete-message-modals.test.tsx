/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeleteMessageModals from "App/messages/components/delete-message-modals/delete-message-modals.component"
import { DeleteMessageModalsTestIds } from "App/messages/components/delete-message-modals/delete-message-modals-test-ids.enum"
import { MessageDeletingState } from "App/messages/constants"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"

type Props = ComponentProps<typeof DeleteMessageModals>

const renderer = (extraProps?: Partial<Props>) => {
  const props: Props = {
    messageDeletingState: null,
    openDeleteMessageConfirmation: false,
    onMessageRemove: noop,
    hideConfirmationModal: noop,
    hideDeleteErrorModal: noop,
    ...extraProps,
  }

  return renderWithThemeAndIntl(<DeleteMessageModals {...props} />)
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
      queryByTestId(DeleteMessageModalsTestIds.SuccessMessageDelete)
    ).not.toBeInTheDocument()
  })
})

describe("when delete message confirmation is supposed to be opened", () => {
  test("the modal is shown", () => {
    const { queryByTestId } = renderer({
      openDeleteMessageConfirmation: true,
    })

    expect(
      queryByTestId(DeleteMessageModalsTestIds.DeleteMessageConfirmation)
    ).toBeInTheDocument()
  })
})

describe("when deleting state equals to success", () => {
  test("only the success info popup is shown", () => {
    const { queryByTestId } = renderer({
      openDeleteMessageConfirmation: false,
      messageDeletingState: MessageDeletingState.Success,
    })

    expect(
      queryByTestId(DeleteMessageModalsTestIds.SuccessMessageDelete)
    ).toBeInTheDocument()
    expect(
      queryByTestId(DeleteMessageModalsTestIds.FailMessageDelete)
    ).not.toBeInTheDocument()
  })
})

describe("when deleting state equals to fail", () => {
  test("only the fail modal is shown", () => {
    const { queryByTestId } = renderer({
      openDeleteMessageConfirmation: false,
      messageDeletingState: MessageDeletingState.Fail,
    })

    expect(
      queryByTestId(DeleteMessageModalsTestIds.SuccessMessageDelete)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteMessageModalsTestIds.FailMessageDelete)
    ).toBeInTheDocument()
  })
})
