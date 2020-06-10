import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import {
  mockedDetails,
  unknownCallerMockedDetails,
} from "./__mocks__/caller-data"

test("sidebar close button informs parent about closing", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails details={mockedDetails} onClose={onClose} />
  )
  fireEvent.click(getByTestId("sidebar-close"))
  expect(onClose).toBeCalled()
})

test("left part of sidebar displays details correctly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails details={mockedDetails} />
  )
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    `${mockedDetails.caller.firstName} ${mockedDetails.caller.lastName}`
  )
  expect(getByTestId("sidebar-phone-number")).toHaveTextContent(
    mockedDetails.caller.phoneNumber
  )
})

test("correct amount of message bubbles is displayed", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessageDetails details={mockedDetails} />
  )
  expect(getAllByTestId("message-content")).toHaveLength(
    mockedDetails.messages.length
  )
})

test("message from unknown person displays only phone number", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails details={unknownCallerMockedDetails} />
  )
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    unknownCallerMockedDetails.caller.phoneNumber
  )
})
