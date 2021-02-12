import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import {
  mockedDetails,
  mockedMessagesFromSecondNumber,
  unknownCallerMockedDetails,
} from "./__mocks__/caller-data"

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

const defaultProps = {
  onDeleteClick: jest.fn(),
  onUnreadStatus: jest.fn(),
  onContactClick: jest.fn(),
  onAttachContactClick: jest.fn(),
  details: mockedDetails,
}

const multipleContactsProps = {
  onDeleteClick: jest.fn(),
  onUnreadStatus: jest.fn(),
  onContactClick: jest.fn(),
  onAttachContactClick: jest.fn(),
  details: mockedMessagesFromSecondNumber,
}

test("sidebar close button informs parent about closing", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} onClose={onClose} />
  )
  fireEvent.click(getByTestId("sidebar-close"))
  expect(onClose).toBeCalled()
})

test("left part of sidebar displays details correctly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
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
    <MessageDetails {...defaultProps} />
  )
  expect(getAllByTestId("message-content")).toHaveLength(
    mockedDetails.messages.length
  )
})

test("message from unknown person displays only phone number", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} details={unknownCallerMockedDetails} />
  )
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    unknownCallerMockedDetails.caller.phoneNumber
  )
})

test("mark massage as unread", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} onClose={onClose} />
  )
  fireEvent.click(getByTestId("icon-BorderCheckIcon"))
  expect(defaultProps.onUnreadStatus).toBeCalledWith([mockedDetails.id])
  expect(onClose).toBeCalled()
})

test("open contacts", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
  )
  fireEvent.click(getByTestId("icon-Contact"))
  expect(defaultProps.onContactClick).toBeCalled()
})

test("delete messages", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
  )
  fireEvent.click(getAllByTestId("icon-Delete")[0])
  expect(defaultProps.onDeleteClick).toBeCalledWith(mockedDetails.id)
})

test("show info about contact with multiple numbers", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
  )
  expect(getByTestId("multiple-number")).toBeInTheDocument()
})

test("show info about second number", () => {
  const { getByText } = renderWithThemeAndIntl(
    <MessageDetails {...multipleContactsProps} />
  )
  expect(getByText("#2")).toBeInTheDocument()
})
