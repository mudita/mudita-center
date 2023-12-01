/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import MessagesSearchResults from "App/messages/components/messages-search-results/messages-search-results.component"
import { MessagesSearchResultsTestIdsEnum } from "App/messages/components/messages-search-results/messages-search-results-test-ids.enum"
import { MessageType, ResultState } from "App/messages/constants"
import { Message } from "App/messages/dto"

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

type Props = ComponentProps<typeof MessagesSearchResults>

const defaultProps: Props = {
  results: [],
  searchValue: "",
  onRowClick: jest.fn(),
  removeMessage: jest.fn(),
  resendMessage: jest.fn(),
  getContactByPhoneNumber: jest.fn(),
  resultsState: ResultState.Empty,
  language: "en",
}

const message: Message = {
  id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
  date: new Date("2019-10-18T11:45:35.112Z"),
  content: "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
  threadId: "2",
  phoneNumber: "4566",
  messageType: MessageType.OUTBOX,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<MessagesSearchResults {...props} />)
}

describe("`MessagesSearchResults` component", () => {
  test("No results should be render as a default state", () => {
    const { queryByTestId } = render()
    expect(
      queryByTestId(MessagesSearchResultsTestIdsEnum.Empty)
    ).toBeInTheDocument()
  })

  test("Loading component is rendered if resultState is Loading", () => {
    const { queryByTestId } = render({ resultsState: ResultState.Loading })
    expect(
      queryByTestId(MessagesSearchResultsTestIdsEnum.Loading)
    ).toBeInTheDocument()
  })

  test("No results is rendered if resultState is Loaded and results list is empty", () => {
    const { queryByTestId } = render({ resultsState: ResultState.Loaded })
    expect(
      queryByTestId(MessagesSearchResultsTestIdsEnum.Empty)
    ).toBeInTheDocument()
  })

  test("Results list is rendered if resultState is Loaded and results isn't empty", () => {
    const { queryByTestId } = render({
      resultsState: ResultState.Loaded,
      results: [message],
    })
    expect(
      queryByTestId(MessagesSearchResultsTestIdsEnum.Table)?.childNodes
    ).toHaveLength(1)
  })
})
