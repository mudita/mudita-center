/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fireEvent } from "@testing-library/dom"
import { ContactInputSelectTestIds } from "App/contacts/components/contact-input-search/contact-input-select-test-ids.enum"
import { ContactSimpleListProps } from "App/contacts/components/contact-simple-list"
import { ContactSimpleListTestIdsEnum } from "App/contacts/components/contact-simple-list/contact-simple-list-test-ids.enum"
import * as ContactSimpleListModule from "App/contacts/components/contact-simple-list/contact-simple-list.component"
import { ContactSelectModal } from "App/contacts/components/contacts-select-modal/contacts-select-modal.component"
import { ContactsSelectModalProps } from "App/contacts/components/contacts-select-modal/contacts-select-modal.interface"
import { Contact } from "App/contacts/dto"
import { InputSearchTestIds } from "App/__deprecated__/renderer/components/core/input-search/input-search.component"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import {
  constructWrapper,
  renderWithThemeAndIntl,
} from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const contacts: Record<string, Contact> = {
  1: {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "example@mudita.com",
    primaryPhoneNumber: "123 456 789",
    secondaryPhoneNumber: "32 123 44 55",
    firstAddressLine: "4929 Pine Garden Lane",
    secondAddressLine: "Atlanta, GA, 30339, USA",
    note: "",
  },
  2: {
    id: "2",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  3: {
    id: "3",
    firstName: "Edmund",
    lastName: "",
    primaryPhoneNumber: "+46 333 060 911",
    secondaryPhoneNumber: "",
    email: "",
    note: "temporibus molestiae",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "016 McClure Curve",
    secondAddressLine: "",
  },
  4: {
    id: "4",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "911",
    secondaryPhoneNumber: "",
    email: "",
    note: "",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  5: {
    id: "5",
    firstName: "Jan",
    lastName: "Nowak",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "",
    note: "",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
}

const render = (props: ContactsSelectModalProps) => {
  const storeMock = createMockStore([thunk])({
    contacts: {
      db: contacts,
      collection: ["1", "2", "3", "4", "5"],
    },
  } as unknown as ReduxRootState)

  const result = renderWithThemeAndIntl(
    <Provider store={storeMock}>
      <ContactSelectModal {...props} />
    </Provider>
  )

  return {
    ...result,
    rerender: (newProps: ContactsSelectModalProps) =>
      result.rerender(
        constructWrapper(
          <Provider store={storeMock}>
            <ContactSelectModal {...newProps} />
          </Provider>
        )
      ),
  }
}

const onPhoneNumberSelect = jest.fn()
const onContactSelect = jest.fn()
const onClose = jest.fn()

beforeAll(() => {
  mockAllIsIntersecting(true)
})

describe("Functionality: open/close", () => {
  test("Modal is closed when `open` field is equal to `false`", () => {
    const { queryByTestId } = render({
      onClose,
      onContactSelect,
      open: false,
      title: "Hello",
      withPhoneNumberOnly: false,
    })

    expect(
      queryByTestId(ContactInputSelectTestIds.Input)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactSimpleListTestIdsEnum.ListWrapper)
    ).not.toBeInTheDocument()
  })

  test("Modal is opened after `open` field change value to `true`", () => {
    const { queryByTestId, rerender } = render({
      onClose,
      onContactSelect,
      open: false,
      title: "Hello",
      withPhoneNumberOnly: false,
    })

    expect(
      queryByTestId(ContactInputSelectTestIds.Input)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactSimpleListTestIdsEnum.ListWrapper)
    ).not.toBeInTheDocument()

    rerender({
      onClose,
      onContactSelect,
      open: true,
      title: "Hello",
      withPhoneNumberOnly: false,
    })

    expect(queryByTestId(ContactInputSelectTestIds.Input)).toBeInTheDocument()
    expect(
      queryByTestId(ContactSimpleListTestIdsEnum.ListWrapper)
    ).toBeInTheDocument()
  })

  test("Calls `onClose` action when user click on close button", () => {
    const { getByTestId } = render({
      onClose,
      onContactSelect,
      open: true,
      title: "Hello",
      withPhoneNumberOnly: false,
    })

    const closeButton = getByTestId(ModalTestIds.CloseButton)

    expect(getByTestId(ContactInputSelectTestIds.Input)).toBeInTheDocument()
    expect(
      getByTestId(ContactSimpleListTestIdsEnum.ListWrapper)
    ).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(0)

    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

describe("Functionality: search", () => {
  test("Display search results in below input", () => {
    const { getByTestId } = render({
      onClose,
      onContactSelect,
      open: true,
      title: "Hello",
      withPhoneNumberOnly: false,
    })

    const searchInput = getByTestId(ContactInputSelectTestIds.Input)

    fireEvent.change(searchInput, { target: { value: "Sławo" } })

    const searchResult = getByTestId(InputSearchTestIds.ListItem)

    expect(searchResult).toHaveTextContent("Sławomir Borewicz+71 195 069 214")
  })

  test("Calls `onSelect` action with selected component", () => {
    const { getByTestId } = render({
      onClose,
      onContactSelect,
      open: true,
      title: "Hello",
      withPhoneNumberOnly: false,
    })

    const searchInput = getByTestId(ContactInputSelectTestIds.Input)

    fireEvent.change(searchInput, { target: { value: "John" } })

    const searchResult = getByTestId(InputSearchTestIds.ListItem)

    expect(onContactSelect).toHaveBeenCalledTimes(0)

    fireEvent.click(searchResult)

    expect(onContactSelect).toHaveBeenLastCalledWith({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "example@mudita.com",
      primaryPhoneNumber: "123 456 789",
      secondaryPhoneNumber: "32 123 44 55",
      firstAddressLine: "4929 Pine Garden Lane",
      secondAddressLine: "Atlanta, GA, 30339, USA",
      note: "",
    })
  })
})

describe("Functionality: contacts list", () => {
  let contactSimpleListSpy: jest.SpyInstance

  beforeEach(() => {
    contactSimpleListSpy = jest.spyOn(
      ContactSimpleListModule,
      "ContactSimpleList"
    )
  })

  afterEach(() => {
    contactSimpleListSpy.mockRestore()
  })

  describe("when withPhoneNumberOnly equals to false", () => {
    test("all contacts are passed to the component", () => {
      render({
        onClose,
        onContactSelect,
        open: true,
        title: "Hello",
        withPhoneNumberOnly: false,
      })

      const contactListProps = contactSimpleListSpy.mock
        .calls[0][0] as ContactSimpleListProps

      expect(contactListProps.contacts.flat().length).toEqual(5)
      expect(contactListProps.contacts.flat()).toMatchInlineSnapshot(`
        Array [
          Object {
            "email": "example@mudita.com",
            "firstAddressLine": "4929 Pine Garden Lane",
            "firstName": "John",
            "id": "1",
            "lastName": "Doe",
            "note": "",
            "primaryPhoneNumber": "123 456 789",
            "secondAddressLine": "Atlanta, GA, 30339, USA",
            "secondaryPhoneNumber": "32 123 44 55",
          },
          Object {
            "blocked": false,
            "email": "example@mudita.com",
            "favourite": false,
            "firstAddressLine": "Malczewskiego 3, Warszawa",
            "firstName": "Sławomir",
            "ice": false,
            "id": "2",
            "lastName": "Borewicz",
            "note": "sapiente rem dignissimos sunt",
            "primaryPhoneNumber": "+71 195 069 214",
            "secondAddressLine": "",
            "secondaryPhoneNumber": "",
          },
          Object {
            "blocked": false,
            "email": "",
            "favourite": false,
            "firstAddressLine": "016 McClure Curve",
            "firstName": "Edmund",
            "ice": true,
            "id": "3",
            "lastName": "",
            "note": "temporibus molestiae",
            "primaryPhoneNumber": "+46 333 060 911",
            "secondAddressLine": "",
            "secondaryPhoneNumber": "",
          },
          Object {
            "blocked": false,
            "email": "",
            "favourite": false,
            "firstAddressLine": "",
            "firstName": "",
            "ice": true,
            "id": "4",
            "lastName": "",
            "note": "",
            "primaryPhoneNumber": "911",
            "secondAddressLine": "",
            "secondaryPhoneNumber": "",
          },
          Object {
            "blocked": false,
            "email": "",
            "favourite": false,
            "firstAddressLine": "",
            "firstName": "Jan",
            "ice": true,
            "id": "5",
            "lastName": "Nowak",
            "note": "",
            "primaryPhoneNumber": "",
            "secondAddressLine": "",
            "secondaryPhoneNumber": "",
          },
        ]
      `)
    })
  })

  describe("when withPhoneNumberOnly equals to true", () => {
    test("only contacts with phone numbers are passed to the component", async () => {
      render({
        onClose,
        onContactSelect,
        open: true,
        title: "Hello",
        withPhoneNumberOnly: true,
      })

      const contactListProps = contactSimpleListSpy.mock
        .calls[0][0] as ContactSimpleListProps

      expect(contactListProps.contacts.flat().length).toEqual(4)
      expect(contactListProps.contacts.flat()).toMatchInlineSnapshot(`
        Array [
          Object {
            "email": "example@mudita.com",
            "firstAddressLine": "4929 Pine Garden Lane",
            "firstName": "John",
            "id": "1",
            "lastName": "Doe",
            "note": "",
            "primaryPhoneNumber": "123 456 789",
            "secondAddressLine": "Atlanta, GA, 30339, USA",
            "secondaryPhoneNumber": "32 123 44 55",
          },
          Object {
            "blocked": false,
            "email": "example@mudita.com",
            "favourite": false,
            "firstAddressLine": "Malczewskiego 3, Warszawa",
            "firstName": "Sławomir",
            "ice": false,
            "id": "2",
            "lastName": "Borewicz",
            "note": "sapiente rem dignissimos sunt",
            "primaryPhoneNumber": "+71 195 069 214",
            "secondAddressLine": "",
            "secondaryPhoneNumber": "",
          },
          Object {
            "blocked": false,
            "email": "",
            "favourite": false,
            "firstAddressLine": "016 McClure Curve",
            "firstName": "Edmund",
            "ice": true,
            "id": "3",
            "lastName": "",
            "note": "temporibus molestiae",
            "primaryPhoneNumber": "+46 333 060 911",
            "secondAddressLine": "",
            "secondaryPhoneNumber": "",
          },
          Object {
            "blocked": false,
            "email": "",
            "favourite": false,
            "firstAddressLine": "",
            "firstName": "",
            "ice": true,
            "id": "4",
            "lastName": "",
            "note": "",
            "primaryPhoneNumber": "911",
            "secondAddressLine": "",
            "secondaryPhoneNumber": "",
          },
        ]
      `)
    })
  })

  describe("when onPhoneNumberSelect is defined", () => {
    test("passes undefined onContactSelect", () => {
      render({
        onClose,
        onContactSelect,
        onPhoneNumberSelect,
        open: true,
        title: "Hello",
        withPhoneNumberOnly: false,
      })

      const contactListProps = contactSimpleListSpy.mock
        .calls[0][0] as ContactSimpleListProps

      expect(contactListProps.onContactSelect).toBeUndefined()
    })
  })

  describe("when onPhoneNumberSelect is not defined", () => {
    test("passes onContactSelect to list component", () => {
      render({
        onClose,
        onContactSelect,
        open: true,
        title: "Hello",
        withPhoneNumberOnly: false,
      })

      const contactListProps = contactSimpleListSpy.mock
        .calls[0][0] as ContactSimpleListProps

      expect(contactListProps.onContactSelect).toEqual(onContactSelect)
    })
  })
})
