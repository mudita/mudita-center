/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import NewMessageBadge from "App/messages/components/new-message-badge.component"
import { NewMessageBadgeTestIds } from "App/messages/components/new-message-badge-test-ids.enum"

type Props = ComponentProps<typeof NewMessageBadge>

const defaultProps: Props = {
  onClose: jest.fn(),
  messagesCount: 1,
  onClick: jest.fn(),
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<NewMessageBadge {...props} />)
}

describe("NewMessageBadge component", () => {
  test("shows one message info", () => {
    const { getByTestId } = renderer()
    expect(getByTestId(NewMessageBadgeTestIds.Info)).toHaveTextContent(
      "[value] module.messages.newMessageBadge"
    )
  })

  test("show multiple messages info", () => {
    const { getByTestId } = renderer({ messagesCount: 3 })
    expect(getByTestId(NewMessageBadgeTestIds.Info)).toHaveTextContent(
      "[value] module.messages.newMessagesBadge"
    )
  })
  test("message click calls onClick function", () => {
    const onClick = jest.fn()
    const { getByTestId } = renderer({ onClick })
    getByTestId(NewMessageBadgeTestIds.Info).click()
    expect(onClick).toBeCalled()
  })
  test("close button calls onClose function", () => {
    const onClickClose = jest.fn()
    const { getByTestId } = renderer({ onClose: onClickClose })
    getByTestId(NewMessageBadgeTestIds.Close).click()
    expect(onClickClose).toBeCalled()
  })
})
