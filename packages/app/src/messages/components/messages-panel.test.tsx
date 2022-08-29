/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import MessagesPanel from "App/messages/components/messages-panel.component"
import { Thread } from "App/messages/dto"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { MessageType } from "App/messages/constants"

type Props = ComponentProps<typeof MessagesPanel>

const threads: Thread[] = [
  {
    id: "1",
    phoneNumber: "+71 195 069 214",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
    messageType: MessageType.INBOX,
  },
  {
    id: "2",
    phoneNumber: "+46 333 060 911",
    lastUpdatedAt: new Date("2020-05-17T19:58:05.136Z"),
    messageSnippet:
      "Velit et ut ut odit quo. Ratione eligendi non consequatur ipsum neque.",
    unread: true,
    messageType: MessageType.INBOX,
  },
]

const defaultProps: Props = {
  searchValue: "",
  onSearchValueChange: jest.fn(),
  onNewMessageClick: jest.fn(),
  buttonDisabled: false,
  selectedIds: [],
  allItemsSelected: false,
  onDeleteClick: jest.fn(),
  toggleAll: jest.fn(),
  onSearchEnterClick: jest.fn(),
  onSelect: jest.fn(),
  showSearchResults: false,
  results: { messages: [], threads: [] },
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

  test("selection manager is displayed when there is at least one thread selected", () => {
    const { getByTestId } = renderer({
      selectedIds: [threads[0].id],
    })
    expect(
      getByTestId(MessagePanelTestIds.SelectionManager)
    ).toBeInTheDocument()
  })
})
