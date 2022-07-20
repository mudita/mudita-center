/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { CallsTableTestIds } from "App/__deprecated__/renderer/components/rest/calls/calls-table.enum"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { mockData } from "App/__mocks__/calls-mock-data"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import Calls, {
  CallsProps,
} from "App/__deprecated__/renderer/modules/phone/tabs/calls.component"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { Caller } from "App/__deprecated__/renderer/models/calls/calls.interface"
import { mapToRawNumber } from "App/messages/helpers"

const defaultProps: CallsProps = {
  calls: mockData,
  isThreadOpened: jest.fn(),
  isContactCreated: jest.fn(),
  getContact: jest.fn(),
}

const renderer = (extraProps?: {}) => {
  const props: CallsProps = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<Calls {...props} />)
}

test("render correct amount of rows", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(CallsTableTestIds.CallsRow)).toHaveLength(
    mockData.length
  )
})

test("caller name is displayed correctly", () => {
  const examplesIndex = 0
  const caller: Caller = mockData[examplesIndex].caller
  const contact: Contact = {
    id: caller.id,
    firstName: caller.firstName,
    lastName: caller.lastName,
    primaryPhoneNumber: caller.phoneNumber,
    secondaryPhoneNumber: caller.secondaryPhoneNumber,
  }
  const { getAllByTestId } = renderer({
    getContact: jest.fn().mockReturnValue(contact),
  })
  const exampleRow = getAllByTestId(CallsTableTestIds.CallerName)[examplesIndex]
  expect(exampleRow).toHaveTextContent(
    `${caller.firstName} ${caller.lastName} (${mockData[examplesIndex].timesMissed})`
  )
})

test("when caller is unknown, displays only phone number + times missed", () => {
  const { getAllByTestId } = renderer()
  const examplesIndex = 2
  const unknownsCallerCol = getAllByTestId(CallsTableTestIds.CallerName)[
    examplesIndex
  ]
  expect(unknownsCallerCol).toHaveTextContent(
    `${mapToRawNumber(mockData[examplesIndex].caller.phoneNumber)} (${
      mockData[examplesIndex].timesMissed
    })`
  )
})

test("past date is displayed correctly", () => {
  const { getAllByTestId } = renderer()
  const pastDataExampleCol = getAllByTestId("call-date")[0]
  expect(pastDataExampleCol).toHaveTextContent(`Jul 2, 2019`)
})

test("past date is displayed correctly", () => {
  const { getAllByTestId } = renderer()
  const pastDataExampleCol = getAllByTestId("call-date")[0]
  expect(pastDataExampleCol).toHaveTextContent(`Jul 2, 2019`)
})

test("dropdown call button has correct content", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId("dropdown-call")[0]).toHaveTextContent(
    intl.formatMessage(
      {
        id: "component.dropdownCall",
      },
      { name: mockData[0].caller.firstName }
    )
  )
})

test("send message button has correct content", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId("send-message")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "module.phone.callsSendMessage",
    })
  )
})

test("call details button has correct content", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId("call-details")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "module.phone.callsDetails",
    })
  )
})

test("delete call button has correct content", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId("delete-call")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "module.phone.callsDeleteCall",
    })
  )
})

test("details are shown on click", () => {
  const { queryByTestId, getAllByTestId } = renderer()

  expect(queryByTestId(CallsTableTestIds.CallDetails)).not.toBeInTheDocument()
  getAllByTestId(CallsTableTestIds.CallerName)[0].click()
  expect(queryByTestId(CallsTableTestIds.CallDetails)).toBeInTheDocument()
})
