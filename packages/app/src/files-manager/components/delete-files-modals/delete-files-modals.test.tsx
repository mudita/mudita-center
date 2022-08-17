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

const defaultProps: DeleteFilesModalProps = {
  filesLength: 0,
  deleting: false,
  deletingInfo: false,
  deletingFailed: false,
  deletingConfirmation: false,
  onCloseDeletingErrorModal: jest.fn(),
  onDelete: jest.fn(),
  onCloseDeletingConfirmationModal: jest.fn(),
}

const render = (props: DeleteFilesModalProps) => {
  return renderWithThemeAndIntl(<DeleteFilesModals {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `DeletingFilesModals`", () => {
  test("don't render modals if default props has been provided", () => {
    const { queryByTestId } = render(defaultProps)

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
      ...defaultProps,
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
      ...defaultProps,
      deletingConfirmation: true,
    })

    const deleteButton = getByText(
      "[value] module.filesManager.deleteFileModalAction"
    )

    expect(defaultProps.onDelete).not.toBeCalled()

    fireEvent.click(deleteButton)

    expect(defaultProps.onDelete).toBeCalled()
  })

  test("triggers `onCloseDeletingConfirmationModal` when clicks on cancel button", () => {
    const { getByText } = render({
      ...defaultProps,
      deletingConfirmation: true,
    })

    const cancelButton = getByText(
      "[value] module.filesManager.deleteFileModalCancel"
    )

    expect(defaultProps.onCloseDeletingConfirmationModal).not.toBeCalled()

    fireEvent.click(cancelButton)

    expect(defaultProps.onCloseDeletingConfirmationModal).toBeCalled()
  })

  test("displays info pop up if `deletingInfo` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultProps,
      deletingInfo: true,
      filesLength: 1,
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
      ...defaultProps,
      deletingInfo: true,
      filesLength: 2,
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

  test("displays error modal if `deletingFailed` is equal to `true`", () => {
    const { queryByTestId } = render({
      ...defaultProps,
      deletingFailed: true,
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

  test("triggers `onCloseDeletingErrorModal` action when clicks on `close` button", () => {
    const { getByTestId } = render({
      ...defaultProps,
      deletingFailed: true,
    })

    const closeModalButton = getByTestId(ModalTestIds.CloseButton)

    expect(defaultProps.onCloseDeletingErrorModal).not.toBeCalled()

    fireEvent.click(closeModalButton)

    expect(defaultProps.onCloseDeletingErrorModal).toBeCalled()
  })
})
