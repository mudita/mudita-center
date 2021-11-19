/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import MessagesPanel from "App/messages/components/messages-panel.component"

type Props = ComponentProps<typeof MessagesPanel>

const defaultProps: Props = {
  searchValue: "",
  onSearchValueChange: jest.fn(),
  onNewMessageClick: jest.fn(),
  buttonDisabled: false,
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<MessagesPanel {...props} />)
}

describe("MessagesPanel component", () => {
  test("component emit onSearchValueChange event when value in input is changed", () => {
    const onSearchValueChange = jest.fn()
    const { getByRole } = renderer({ onSearchValueChange })
    fireEvent.change(getByRole("searchbox"), { target: { value: "a" } })
    expect(onSearchValueChange).toBeCalled()
  })

  test("component emit onNewMessageClick event when NewMessage button is clicked", () => {
    const onNewMessageClick = jest.fn()
    const { getByRole } = renderer({ onNewMessageClick })
    fireEvent.click(getByRole("button"))
    expect(onNewMessageClick).toBeCalled()
  })
})
