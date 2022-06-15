/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { CreatingTemplateModals } from "App/templates/components/creating-template-modals/creating-template-modals.component"
import { CreatingTemplateModalsProps } from "App/templates/components/creating-template-modals/creating-template-modals.interface"
import { CreatingTemplateModalsTestIds } from "App/templates/components/creating-template-modals/creating-template-modals-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const defaultPropsMock: CreatingTemplateModalsProps = {
  error: null,
  creating: false,
  creatingInfo: false,
  onCloseCreatingErrorModal: jest.fn(),
}

const render = (props: CreatingTemplateModalsProps) => {
  return renderWithThemeAndIntl(<CreatingTemplateModals {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `CreatingTemplateModals`", () => {
  test("don't render modals if default props has been provided", () => {
    const { queryByTestId } = render(defaultPropsMock)

    expect(
      queryByTestId(CreatingTemplateModalsTestIds.CreatedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(CreatingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(CreatingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays info pop up if `creatingInfo` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      creatingInfo: true,
    })

    expect(
      queryByTestId(CreatingTemplateModalsTestIds.CreatedPopUp)
    ).toBeInTheDocument()

    expect(
      queryByTestId(CreatingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(CreatingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays loading modal if `creating` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      creating: true,
    })

    expect(
      queryByTestId(CreatingTemplateModalsTestIds.LoadingModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(CreatingTemplateModalsTestIds.CreatedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(CreatingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays error modal if `creating` is equal to `true` and `error` isn't empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      creating: true,
      error: "Luke, I'm your error",
    })

    expect(
      queryByTestId(CreatingTemplateModalsTestIds.ErrorModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(CreatingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(CreatingTemplateModalsTestIds.CreatedPopUp)
    ).not.toBeInTheDocument()
  })

  test("triggers `onCloseCreatingErrorModal` when clicks on `close` button", async () => {
    const { getByTestId } = render({
      ...defaultPropsMock,
      creating: true,
      error: "Luke, I'm your error",
    })

    const closeModalButton = getByTestId(ModalTestIds.CloseButton)

    expect(defaultPropsMock.onCloseCreatingErrorModal).toHaveBeenCalledTimes(0)

    fireEvent.click(closeModalButton)

    expect(defaultPropsMock.onCloseCreatingErrorModal).toHaveBeenCalledTimes(1)
  })
})
