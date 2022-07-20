/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { OrderingTemplateModals } from "App/templates/components/ordering-template-modals/ordering-template-modals.component"
import { OrderingTemplateModalsProps } from "App/templates/components/ordering-template-modals/ordering-template-modals.interface"
import { OrderingTemplateModalsTestIds } from "App/templates/components/ordering-template-modals/ordering-template-modals-test-ids.enum"

const defaultPropsMock: OrderingTemplateModalsProps = {
  updated: false,
  error: null,
  updating: false,
}

const render = (props: OrderingTemplateModalsProps) => {
  return renderWithThemeAndIntl(<OrderingTemplateModals {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Component: `OrderingTemplateModals`", () => {
  test("don't render modals if default props has been provided", () => {
    const { queryByTestId } = render(defaultPropsMock)

    expect(
      queryByTestId(OrderingTemplateModalsTestIds.Error)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(OrderingTemplateModalsTestIds.OrderUpdated)
    ).not.toBeInTheDocument()
  })

  test("displays success info popup if `updated` is equal to `true` and `error` is empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      updated: true,
    })

    const popUp = queryByTestId(OrderingTemplateModalsTestIds.OrderUpdated)

    expect(popUp).toBeInTheDocument()
    expect(popUp).toHaveTextContent("[value] module.templates.orderUpdated")

    expect(
      queryByTestId(OrderingTemplateModalsTestIds.Error)
    ).not.toBeInTheDocument()
  })

  test("displays error info popup if `ordering` is equal to `true` and `error` isn't empty", () => {
    const { queryByTestId } = render({
      ...defaultPropsMock,
      updating: true,
      error: "Error occurred",
    })

    const popUp = queryByTestId(OrderingTemplateModalsTestIds.Error)

    expect(popUp).toBeInTheDocument()
    expect(popUp).toHaveTextContent("[value] module.templates.orderError")

    expect(
      queryByTestId(OrderingTemplateModalsTestIds.OrderUpdated)
    ).not.toBeInTheDocument()
  })
})
