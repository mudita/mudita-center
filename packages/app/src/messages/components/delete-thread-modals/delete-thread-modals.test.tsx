/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { DeleteThreadModals } from "App/messages/components/delete-thread-modals/delete-thread-modals.component"
import { DeleteThreadModalProps } from "App/messages/components/delete-thread-modals/delete-thread-modals.interface"
import { DeleteThreadModalsTestIds } from "App/messages/components/delete-thread-modals/delete-thread-modals-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const defaultPropsMock: DeleteThreadModalProps = {
  deletedThreads: [],
  error: null,
  deleting: false,
  deletingConfirmation: false,
  onCloseDeletingErrorModal: jest.fn(),
  onDelete: jest.fn(),
  onCloseDeletingModal: jest.fn(),
}

const render = (props: DeleteThreadModalProps) => {
  return renderWithThemeAndIntl(<DeleteThreadModals {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `DeletingTemplateModals`", () => {
  test("don't render modals if default props has been provided", () => {
    const { queryByTestId } = render(defaultPropsMock)

    expect(
      queryByTestId(DeleteThreadModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays deletion confirmation modals if `deletingConfirmation` is equal to `true`", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deletingConfirmation: true,
    })

    expect(
      queryByTestId(DeleteThreadModalsTestIds.ConfirmationModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeleteThreadModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("triggers `onDelete` action when clicks on delete button", () => {
    const { getByText } = render({
      ...defaultPropsMock,
      deletingConfirmation: true,
    })

    const deleteButton = getByText(
      "[value] module.messages.deleteThreadModalAction"
    )

    expect(defaultPropsMock.onDelete).not.toBeCalled()

    fireEvent.click(deleteButton)

    expect(defaultPropsMock.onDelete).toBeCalled()
  })

  test("triggers `onCloseDeletingModal` action when clicks on cancel button", () => {
    const { getByText } = render({
      ...defaultPropsMock,
      deletingConfirmation: true,
    })

    const cancelButton = getByText(
      "[value] module.messages.deleteThreadModalCancel"
    )

    expect(defaultPropsMock.onCloseDeletingModal).not.toBeCalled()

    fireEvent.click(cancelButton)

    expect(defaultPropsMock.onCloseDeletingModal).toBeCalled()
  })

  test("displays loading modal if `deleting` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deleting: true,
    })

    expect(
      queryByTestId(DeleteThreadModalsTestIds.LoadingModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeleteThreadModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays error modal if `deleting` is equal to `true` and `error` isn't empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deleting: true,
      error: "Luke, I'm your error",
    })

    expect(
      queryByTestId(DeleteThreadModalsTestIds.ErrorModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeleteThreadModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
  })

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("triggers `onCloseDeletingErrorModal` when clicks on `close` button", async () => {
    const { getByTestId } = render({
      ...defaultPropsMock,
      deleting: true,
      error: "Luke, I'm your error",
    })

    const closeModalButton = getByTestId(ModalTestIds.CloseButton)

    expect(defaultPropsMock.onCloseDeletingErrorModal).not.toBeCalled()

    fireEvent.click(closeModalButton)

    expect(defaultPropsMock.onCloseDeletingErrorModal).toBeCalled()
  })
})
