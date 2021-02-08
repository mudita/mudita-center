import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import StatBoxes from "Renderer/components/rest/tethering/stat-boxes.component"
import { StatBoxesTestIds } from "Renderer/components/rest/tethering/stat-boxes-test-ids.enum"

const defaultProps = {
  timeActive: "15:03",
  dataReceived: 23943294,
  dataSent: 92349324,
}

const renderer = (props = {}) =>
  renderWithThemeAndIntl(<StatBoxes {...defaultProps} {...props} />)

test("time active text is rendered", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(StatBoxesTestIds.TimeActiveText)).toHaveTextContent(
    defaultProps.timeActive
  )
})

test("data sent is rendered after conversion", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(StatBoxesTestIds.DataSentText)).toHaveTextContent("88.1MB")
})

test("data received is rendered after conversion ", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(StatBoxesTestIds.DataReceivedText)).toHaveTextContent(
    "22.8MB"
  )
})
