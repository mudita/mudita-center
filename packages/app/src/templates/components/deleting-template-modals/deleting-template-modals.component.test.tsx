/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { DeletingTemplateModals } from "App/templates/components/deleting-template-modals/deleting-template-modals.component"
import { DeletingTemplateModalsProps } from "App/templates/components/deleting-template-modals/deleting-template-modals.interface"
import { DeletingTemplateModalsTestIds } from "App/templates/components/deleting-template-modals/deleting-template-modals-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const defaultPropsMock: DeletingTemplateModalsProps = {
  deletedTemplatesLength: 0,
  error: null,
  deleting: false,
  deletingInfo: false,
  deletingConfirmation: false,
  onCloseDeletingErrorModal: jest.fn(),
  onDelete: jest.fn(),
  onCloseDeletingModal: jest.fn(),
}

const render = (props: DeletingTemplateModalsProps) => {
  return renderWithThemeAndIntl(<DeletingTemplateModals {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `DeletingTemplateModals`", () => {
  test("don't render modals if default props has been provided", () => {
    const { queryByTestId } = render(defaultPropsMock)

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays deletion confirmation modals if `deletingConfirmation` is equal to `true`", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deletingConfirmation: true,
    })

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ConfirmationModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("triggers `onDelete` action when clicks on delete button", () => {
    const { getByText } = render({
      ...defaultPropsMock,
      deletingConfirmation: true,
    })

    const deleteButton = getByText("[value] module.templates.deleteButton")

    expect(defaultPropsMock.onDelete).not.toBeCalled()

    fireEvent.click(deleteButton)

    expect(defaultPropsMock.onDelete).toBeCalled()
  })

  test("triggers `onCloseDeletingModal` action when clicks on cancel button", () => {
    const { getByText } = render({
      ...defaultPropsMock,
      deletingConfirmation: true,
    })

    const cancelButton = getByText("[value] module.templates.cancelButton")

    expect(defaultPropsMock.onCloseDeletingModal).not.toBeCalled()

    fireEvent.click(cancelButton)

    expect(defaultPropsMock.onCloseDeletingModal).toBeCalled()
  })

  test("displays info pop up if `creatingInfo` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deletingInfo: true,
      deletedTemplatesLength: 1,
    })

    const popUp = queryByTestId(DeletingTemplateModalsTestIds.DeletedPopUp)

    expect(popUp).toBeInTheDocument()
    expect(popUp).toHaveTextContent("[value] module.templates.templateDelete")

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays info pop up with deleted entity count if `creatingInfo` is equal to `true`, `error` is empty and `deletedTemplatesLength` is more then `1`", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deletingInfo: true,
      deletedTemplatesLength: 2,
    })

    const popUp = queryByTestId(DeletingTemplateModalsTestIds.DeletedPopUp)

    expect(popUp).toBeInTheDocument()
    expect(popUp).toHaveTextContent("[value] module.templates.templatesDelete")

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays loading modal if `deleting` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deleting: true,
    })

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.LoadingModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ConfirmationModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays error modal if `deleting` is equal to `true` and `error` isn't empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      deleting: true,
      error: "Luke, I'm your error",
    })

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ErrorModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(DeletingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.DeletedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeletingTemplateModalsTestIds.ConfirmationModal)
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
