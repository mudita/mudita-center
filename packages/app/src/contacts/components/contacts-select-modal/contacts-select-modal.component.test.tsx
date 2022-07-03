/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { fireEvent } from "@testing-library/dom"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import {
  renderWithThemeAndIntl,
  constructWrapper,
} from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ContactsSelectModalProps } from "App/contacts/components/contacts-select-modal/contacts-select-modal.interface"
import { ContactSelectModal } from "App/contacts/components/contacts-select-modal/contacts-select-modal.component"
import { Contact } from "App/contacts/dto"
import { ContactInputSelectTestIds } from "App/contacts/components/contact-input-search/contact-input-select-test-ids.enum"
import { ContactSimpleListTestIdsEnum } from "App/contacts/components/contact-simple-list/contact-simple-list-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { InputSearchTestIds } from "App/__deprecated__/renderer/components/core/input-search/input-search.component"

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
}

const render = (props: ContactsSelectModalProps) => {
  const storeMock = createMockStore([thunk])({
    contacts: {
      db: contacts,
      collection: ["1", "2", "3", "4"],
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

const onSelect = jest.fn()
const onClose = jest.fn()

beforeAll(() => {
  mockAllIsIntersecting(true)
})

describe("Functionality: open/close", () => {
  test("Modal is closed when `open` field is equal to `false`", () => {
    const { queryByTestId } = render({
      onClose,
      onSelect,
      open: false,
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
      onSelect,
      open: false,
    })

    expect(
      queryByTestId(ContactInputSelectTestIds.Input)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactSimpleListTestIdsEnum.ListWrapper)
    ).not.toBeInTheDocument()

    rerender({
      onClose,
      onSelect,
      open: true,
    })

    expect(queryByTestId(ContactInputSelectTestIds.Input)).toBeInTheDocument()
    expect(
      queryByTestId(ContactSimpleListTestIdsEnum.ListWrapper)
    ).toBeInTheDocument()
  })

  test("Calls `onClose` action when user click on close button", () => {
    const { getByTestId } = render({
      onClose,
      onSelect,
      open: true,
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
      onSelect,
      open: true,
    })

    const searchInput = getByTestId(ContactInputSelectTestIds.Input)

    fireEvent.change(searchInput, { target: { value: "Sławo" } })

    const searchResult = getByTestId(InputSearchTestIds.ListItem)

    expect(searchResult).toHaveTextContent("Sławomir Borewicz+71 195 069 214")
  })

  test("Calls `onSelect` action with selected component", () => {
    const { getByTestId } = render({
      onClose,
      onSelect,
      open: true,
    })

    const searchInput = getByTestId(ContactInputSelectTestIds.Input)

    fireEvent.change(searchInput, { target: { value: "John" } })

    const searchResult = getByTestId(InputSearchTestIds.ListItem)

    expect(onSelect).toHaveBeenCalledTimes(0)

    fireEvent.click(searchResult)

    expect(onSelect).toHaveBeenLastCalledWith({
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
