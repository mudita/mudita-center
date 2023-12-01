/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { UpdatingTemplateModals } from "App/templates/components/updating-template-modals/updating-template-modals.component"
import { UpdatingTemplateModalsProps } from "App/templates/components/updating-template-modals/updating-template-modals.interface"
import { UpdatingTemplateModalsTestIds } from "App/templates/components/updating-template-modals/updating-template-modals-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const defaultPropsMock: UpdatingTemplateModalsProps = {
  error: null,
  updating: false,
  updatingInfo: false,
  onCloseUpdatingErrorModal: jest.fn(),
}

const render = (props: UpdatingTemplateModalsProps) => {
  return renderWithThemeAndIntl(<UpdatingTemplateModals {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `UpdatingTemplateModals`", () => {
  test("don't render modals if default props has been provided", () => {
    const { queryByTestId } = render(defaultPropsMock)

    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.UpdatedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays info pop up if `updatingInfo` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      updatingInfo: true,
    })

    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.UpdatedPopUp)
    ).toBeInTheDocument()

    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays loading modal if `updating` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      updating: true,
    })

    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.LoadingModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.UpdatedPopUp)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.ErrorModal)
    ).not.toBeInTheDocument()
  })

  test("displays error modal if `updating` is equal to `true` and `error` isn't empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      updating: true,
      error: "Luke, I'm your error",
    })

    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.ErrorModal)
    ).toBeInTheDocument()

    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.LoadingModal)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(UpdatingTemplateModalsTestIds.UpdatedPopUp)
    ).not.toBeInTheDocument()
  })

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("triggers `onCloseCreatingErrorModal` when clicks on `close` button", async () => {
    const { getByTestId } = render({
      ...defaultPropsMock,
      updating: true,
      error: "Luke, I'm your error",
    })

    const closeModalButton = getByTestId(ModalTestIds.CloseButton)

    expect(defaultPropsMock.onCloseUpdatingErrorModal).toHaveBeenCalledTimes(0)

    fireEvent.click(closeModalButton)

    expect(defaultPropsMock.onCloseUpdatingErrorModal).toHaveBeenCalledTimes(1)
  })
})
