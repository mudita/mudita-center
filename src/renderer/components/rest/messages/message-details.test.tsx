import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import {
  mockedDetails,
  unknownCallerMockedDetails,
} from "./__mocks__/caller-data"

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

const onDeleteClick = jest.fn()
const onUnreadStatus = jest.fn()
const onContactClick = jest.fn()

test("sidebar close button informs parent about closing", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails
      onDeleteClick={onDeleteClick}
      onUnreadStatus={onUnreadStatus}
      onContactClick={onContactClick}
      details={mockedDetails}
      onClose={onClose}
    />
  )
  fireEvent.click(getByTestId("sidebar-close"))
  expect(onClose).toBeCalled()
})

test("left part of sidebar displays details correctly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails
      onContactClick={onContactClick}
      onDeleteClick={onDeleteClick}
      onUnreadStatus={onUnreadStatus}
      details={mockedDetails}
    />
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
    <MessageDetails
      onContactClick={onContactClick}
      onDeleteClick={onDeleteClick}
      onUnreadStatus={onUnreadStatus}
      details={mockedDetails}
    />
  )
  expect(getAllByTestId("message-content")).toHaveLength(
    mockedDetails.messages.length
  )
})

test("message from unknown person displays only phone number", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails
      onContactClick={onContactClick}
      onDeleteClick={onDeleteClick}
      onUnreadStatus={onUnreadStatus}
      details={unknownCallerMockedDetails}
    />
  )
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    unknownCallerMockedDetails.caller.phoneNumber
  )
})

test("mark massage as unread", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails
      onDeleteClick={onDeleteClick}
      onUnreadStatus={onUnreadStatus}
      onContactClick={onContactClick}
      details={mockedDetails}
      onClose={onClose}
    />
  )
  fireEvent.click(getByTestId("icon-BorderCheckIcon"))
  expect(onUnreadStatus).toBeCalledWith([mockedDetails.id])
  expect(onClose).toBeCalled()
})

test("open contacts", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails
      onDeleteClick={onDeleteClick}
      onUnreadStatus={onUnreadStatus}
      onContactClick={onContactClick}
      details={mockedDetails}
    />
  )
  fireEvent.click(getByTestId("icon-Contact"))
  expect(onContactClick).toBeCalled()
})

test("delete messages", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessageDetails
      onDeleteClick={onDeleteClick}
      onUnreadStatus={onUnreadStatus}
      onContactClick={onContactClick}
      details={mockedDetails}
    />
  )
  fireEvent.click(getAllByTestId("icon-Delete")[0])
  expect(onDeleteClick).toBeCalledWith(mockedDetails.id)
})
