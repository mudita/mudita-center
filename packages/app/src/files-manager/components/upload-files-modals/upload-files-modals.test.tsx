/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { UploadFilesModals } from "App/files-manager/components/upload-files-modals/upload-files-modals.component"
import { UploadFilesModalProps } from "App/files-manager/components/upload-files-modals/upload-files-modals.interface"
import { UploadFilesModalsTestIds } from "App/files-manager/components/upload-files-modals/upload-files-modals-test-ids.enum"

const defaultProps: UploadFilesModalProps = {
  filesLength: 0,
  uploading: false,
  uploadingInfo: false,
  uploadingFailed: false,
  onCloseUploadingErrorModal: jest.fn(),
}

const render = (props: UploadFilesModalProps) => {
  return renderWithThemeAndIntl(<UploadFilesModals {...props} />)
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
    expect(popUp).toHaveTextContent("[value] module.filesManager.uploadingModalInfo")

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
    expect(popUp).toHaveTextContent("[value] module.filesManager.uploadingModalInfo")

    expect(
      queryByTestId(UploadFilesModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UploadFilesModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays error modal if `uploadingFailed` is equal to `true`", () => {
    const { queryByTestId } = render({
      ...defaultProps,
      uploadingFailed: true,
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

  test("triggers `onCloseUploadingErrorModal` action when clicks on `close` button", () => {
    const { getByTestId } = render({
      ...defaultProps,
      uploadingFailed: true,
    })

    const closeModalButton = getByTestId(ModalTestIds.CloseButton)

    expect(defaultProps.onCloseUploadingErrorModal).not.toBeCalled()

    fireEvent.click(closeModalButton)

    expect(defaultProps.onCloseUploadingErrorModal).toBeCalled()
  })
})
