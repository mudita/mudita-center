/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { AppError } from "Core/core/errors"
import { FilesManagerError } from "Core/files-manager/constants"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ModalTestIds } from "Core/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { UploadFilesModals } from "Core/files-manager/components/upload-files-modals/upload-files-modals.component"
import { UploadFilesModalProps } from "Core/files-manager/components/upload-files-modals/upload-files-modals.interface"
import { UploadFilesModalsTestIds } from "Core/files-manager/components/upload-files-modals/upload-files-modals-test-ids.enum"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { initialState as filesManagerInitialState } from "Core/files-manager/reducers/files-manager.reducer"

const defaultProps: UploadFilesModalProps = {
  filesLength: 0,
  uploading: false,
  uploadingInfo: false,
  error: null,
  onCloseUploadingErrorModal: jest.fn(),
  pendingUpload: false,
  pendingFilesCount: 0,
  onAbortPendingUpload: jest.fn(),
  onContinuePendingUpload: jest.fn(),
}

const storeMock = createMockStore([thunk])({
  ...{
    filesManager: { ...filesManagerInitialState },
  },
})

const render = (props: UploadFilesModalProps) => {
  return renderWithThemeAndIntl(
    <Provider store={storeMock}>
      <UploadFilesModals {...props} />
    </Provider>
  )
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `UploadFilesModals`", () => {
  test("don't render modals if default props has been provided", () => {
    const { queryByTestId } = render(defaultProps)

    expect(
      queryByTestId(UploadFilesModalsTestIds.UploadedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UploadFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UploadFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays info pop up if `uploadingInfo` is equal to `true`", () => {
    const { queryByTestId } = render({
      ...defaultProps,
      uploadingInfo: true,
      filesLength: 1,
    })

    const popUp = queryByTestId(UploadFilesModalsTestIds.UploadedPopUp)

    expect(popUp).toBeInTheDocument()
    expect(popUp).toHaveTextContent(
      "[value] module.filesManager.uploadingModalInfo"
    )

    expect(
      queryByTestId(UploadFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UploadFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays info pop up with uploaded entity count if `uploadingInfo` is equal to `true`, and `filesLength` is more then `1`", () => {
    const { queryByTestId } = render({
      ...defaultProps,
      uploadingInfo: true,
      filesLength: 2,
    })

    const popUp = queryByTestId(UploadFilesModalsTestIds.UploadedPopUp)

    expect(popUp).toBeInTheDocument()
    expect(popUp).toHaveTextContent(
      "[value] module.filesManager.uploadingModalInfo"
    )

    expect(
      queryByTestId(UploadFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UploadFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays error modal if there is an error defined", () => {
    const { queryByTestId } = render({
      ...defaultProps,
      error: new AppError(FilesManagerError.NotEnoughSpace, "test error"),
    })

    expect(
      queryByTestId(UploadFilesModalsTestIds.ErrorModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(UploadFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UploadFilesModalsTestIds.UploadedPopUp)
    ).not.toBeInTheDocument()
  })

  test("displays error modal with `NoSpaceLeft` error if error type is equal to `FilesManagerError.NotEnoughSpace`", () => {
    const { queryByTestId, queryByText } = render({
      ...defaultProps,
      error: new AppError(
        FilesManagerError.NotEnoughSpace,
        "Not enough space on your device"
      ),
    })

    expect(
      queryByTestId(UploadFilesModalsTestIds.ErrorModal)
    ).toBeInTheDocument()
    expect(
      queryByText("[value] module.filesManager.uploadingModalNoSpaceErrorTitle")
    ).toBeInTheDocument()
    expect(
      queryByText(
        "[value] module.filesManager.uploadingModalNoSpaceErrorSubtitle"
      )
    ).toBeInTheDocument()

    expect(
      queryByTestId(UploadFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UploadFilesModalsTestIds.UploadedPopUp)
    ).not.toBeInTheDocument()
  })

  test("triggers `onCloseUploadingErrorModal` action when clicks on `close` button", () => {
    const { getByTestId } = render({
      ...defaultProps,
      error: new AppError(
        FilesManagerError.NotEnoughSpace,
        "Not enough space on your device"
      ),
    })

    const closeModalButton = getByTestId(ModalTestIds.CloseButton)

    expect(defaultProps.onCloseUploadingErrorModal).not.toBeCalled()

    fireEvent.click(closeModalButton)

    expect(defaultProps.onCloseUploadingErrorModal).toBeCalled()
  })
})
