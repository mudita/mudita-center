/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { DeleteFilesModals } from "App/files-manager/components/delete-files-modals/delete-files-modals.component"
import { DeleteFilesModalProps } from "App/files-manager/components/delete-files-modals/delete-files-modals.interface"
import { DeleteFilesModalsTestIds } from "App/files-manager/components/delete-files-modals/delete-files-modals-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const defaultPropsMock: DeleteFilesModalProps = {
  deletedFilesLength: 0,
  error: null,
  deleting: false,
  deletingInfo: false,
  deletingConfirmation: false,
  onCloseDeletingErrorModal: jest.fn(),
  onDelete: jest.fn(),
  onCloseDeletingModal: jest.fn(),
}

const render = (props: DeleteFilesModalProps) => {
  return renderWithThemeAndIntl(<DeleteFilesModals {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `DeletingFilesModals`", () => {
  test("don't render modals if default props has been provided", () => {
    const { queryByTestId } = render(defaultPropsMock)

    expect(
      queryByTestId(DeleteFilesModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays deletion confirmation modals if `deletingConfirmation` is equal to `true`", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deletingConfirmation: true,
    })

    expect(
      queryByTestId(DeleteFilesModalsTestIds.ConfirmationModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeleteFilesModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("triggers `onDelete` action when clicks on delete button", () => {
    const { getByText } = render({
      ...defaultPropsMock,
      deletingConfirmation: true,
    })

    const deleteButton = getByText(
      "[value] module.filesManager.deleteFileModalAction"
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
      "[value] module.filesManager.deleteFileModalCancel"
    )

    expect(defaultPropsMock.onCloseDeletingModal).not.toBeCalled()

    fireEvent.click(cancelButton)

    expect(defaultPropsMock.onCloseDeletingModal).toBeCalled()
  })

  test("displays info pop up if `deletingInfo` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deletingInfo: true,
      deletedFilesLength: 1,
    })

    const popUp = queryByTestId(DeleteFilesModalsTestIds.DeletedPopUp)

    expect(popUp).toBeInTheDocument()
    expect(popUp).toHaveTextContent("[value] module.filesManager.deletePopup")

    expect(
      queryByTestId(DeleteFilesModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays info pop up with deleted entity count if `deletingInfo` is equal to `true`, `error` is empty and `deletedTemplatesLength` is more then `1`", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deletingInfo: true,
      deletedFilesLength: 2,
    })

    const popUp = queryByTestId(DeleteFilesModalsTestIds.DeletedPopUp)

    expect(popUp).toBeInTheDocument()
    expect(popUp).toHaveTextContent("[value] module.filesManager.deletePopup")

    expect(
      queryByTestId(DeleteFilesModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays loading modal if `deleting` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deleting: true,
    })

    expect(
      queryByTestId(DeleteFilesModalsTestIds.LoadingModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeleteFilesModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays error modal if `deleting` is equal to `true` and `error` isn't empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deleting: true,
      error: "Luke, I'm your error",
    })

    expect(
      queryByTestId(DeleteFilesModalsTestIds.ErrorModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeleteFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteFilesModalsTestIds.ConfirmationModal)
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
