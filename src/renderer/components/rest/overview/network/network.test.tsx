import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { NetworkProps } from "Renderer/components/rest/overview/network/network.interface"
import Network from "Renderer/components/rest/overview/network/network.component"
import { intl } from "Renderer/utils/intl"
import getFakeAdapters from "App/tests/get-fake-adapters"

const renderNetwork = ({ simCards = [] }: Partial<NetworkProps> = {}) => {
  const outcome = renderWithThemeAndIntl(<Network simCards={simCards} />)
  return {
    ...outcome,
    getButtons: () => outcome.queryAllByRole("button"),
    getDescription: () =>
      outcome.queryByText(
        intl.formatMessage({ id: "view.name.overview.network.description" })
      ),
  }
}

test("matches snapshot", () => {
  const { container } = renderNetwork()
  expect(container).toMatchSnapshot()
})

test("renders card name properly", () => {
  const { queryByText } = renderNetwork()
  expect(
    queryByText(intl.formatMessage({ id: "view.name.overview.network.name" }))
  )
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
  const simCard = getFakeAdapters().pureNetwork.getSimCards()[0]
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
  const simCard = getFakeAdapters().pureNetwork.getSimCards()[1]
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
  const simCards = getFakeAdapters().pureNetwork.getSimCards()
  const { getButtons, getDescription } = renderNetwork({
    simCards,
  })
  expect(getButtons()).toHaveLength(2)
  simCards.forEach((simCard, index) => {
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
