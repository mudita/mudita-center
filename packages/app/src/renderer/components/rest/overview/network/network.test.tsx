/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { NetworkProps } from "Renderer/components/rest/overview/network/network.interface"
import Network from "Renderer/components/rest/overview/network/network.component"
import { intl } from "Renderer/utils/intl"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { fireEvent } from "@testing-library/dom"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

const renderNetwork = ({
  simCards = [],
  onSimChange,
}: Partial<NetworkProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Network simCards={simCards} onSimChange={onSimChange} />
  )
  return {
    ...outcome,
    getButtons: () => outcome.queryAllByRole("button"),
    getDescription: () =>
      outcome.queryByText(
        intl.formatMessage({ id: "view.name.overview.network.description" })
      ),
  }
}

let fakeSimCards: SimCard[] = []

beforeEach(async () => {
  const { data } = await getFakeAdapters().pureNetwork.getSimCards()
  fakeSimCards = data ?? []
})

test("matches snapshot", () => {
  const { container } = renderNetwork()
  expect(container).toMatchSnapshot()
})

test("renders card name properly", () => {
  const { queryByText } = renderNetwork()
  expect(
    queryByText(intl.formatMessage({ id: "view.name.overview.network.name" }))
  ).toBeInTheDocument()
})

test("renders 'no sim card' state properly", () => {
  const { getButtons, getDescription } = renderNetwork()
  expect(getButtons()).toHaveLength(1)
  expect(getButtons()[0]).toHaveTextContent(
    intl.formatMessage({ id: "view.name.overview.network.noSimInserted" })
  )
  expect(getDescription()).not.toBeInTheDocument()
})

test("renders single active sim card info properly", () => {
  const simCard = fakeSimCards[0]
  const { getButtons, getDescription } = renderNetwork({
    simCards: [simCard],
  })
  expect(getButtons()).toHaveLength(1)
  expect(getButtons()[0]).toHaveTextContent(
    intl.formatMessage(
      {
        id: "view.name.overview.network.simInfo",
      },
      { slot: simCard.slot, phone: simCard.number }
    )
  )
  expect(getDescription()).not.toBeInTheDocument()
})

test("renders single inactive sim card info properly", () => {
  const simCard = fakeSimCards[1]
  const { getButtons, getDescription } = renderNetwork({
    simCards: [simCard],
  })
  expect(getButtons()).toHaveLength(1)
  expect(getButtons()[0]).toHaveTextContent(
    intl.formatMessage(
      {
        id: "view.name.overview.network.simInfo",
      },
      { slot: simCard.slot, phone: simCard.number }
    )
  )
  expect(getDescription()).toBeInTheDocument()
})

test("renders two sim cards info properly", () => {
  const { getButtons, getDescription } = renderNetwork({
    simCards: fakeSimCards,
  })
  expect(getButtons()).toHaveLength(2)
  fakeSimCards.forEach((simCard, index) => {
    expect(getButtons()[index]).toHaveTextContent(
      intl.formatMessage(
        {
          id: "view.name.overview.network.simInfo",
        },
        { slot: simCard.slot, phone: simCard.number }
      )
    )
  })
  expect(getDescription()).toBeInTheDocument()
})

test("returns a SIM info after its activation", () => {
  const onSimChange = jest.fn()

  const { getButtons } = renderNetwork({
    simCards: fakeSimCards,
    onSimChange,
  })

  fireEvent.click(getButtons()[1])

  expect(onSimChange).toHaveBeenCalledWith(fakeSimCards[1])
})
