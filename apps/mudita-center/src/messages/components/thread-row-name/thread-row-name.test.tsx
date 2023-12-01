/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/dto"
import { ThreadRowNameTestIds } from "App/messages/components/thread-row-name/thread-row-name-test-ids"
import ThreadRowName from "App/messages/components/thread-row-name/thread-row-name.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"

type Props = ComponentProps<typeof ThreadRowName>

const defaultProps: Props = {
  phoneNumber: "111",
  contact: undefined,
}

const contact: Contact = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "666777888",
}

const renderer = (extraProps?: Partial<Props>) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<ThreadRowName {...props} />)

  return {
    ...outcome,
    getNameField: () => outcome.queryByTestId(ThreadRowNameTestIds.NameField),
    getPhoneNumberPriorityField: () =>
      outcome.queryByTestId(ThreadRowNameTestIds.PhoneNumberDesignatorField),
  }
}

describe("when contact is defined", () => {
  test("pretty name is displayed", () => {
    const { getNameField } = renderer({
      contact,
      phoneNumber: "666777888",
    })

    expect(getNameField()).toHaveTextContent("John Doe")
  })
})

describe("when contact has defined secondary phone number", () => {
  describe("when phone number equals to primary phone number", () => {
    test("#1 is displayed", () => {
      const { getPhoneNumberPriorityField } = renderer({
        contact: {
          ...contact,
          primaryPhoneNumber: "123456789",
          secondaryPhoneNumber: "666777888",
        },
        phoneNumber: "123456789",
      })

      expect(getPhoneNumberPriorityField()).toHaveTextContent("#1")
    })
  })

  describe("when phone number equals to secondary phone number", () => {
    test("#2 is displayed", () => {
      const { getPhoneNumberPriorityField } = renderer({
        contact: {
          ...contact,
          primaryPhoneNumber: "123456789",
          secondaryPhoneNumber: "666777888",
        },
        phoneNumber: "666777888",
      })

      expect(getPhoneNumberPriorityField()).toHaveTextContent("#2")
    })
  })
})

describe("when contact has not defined secondary phone number", () => {
  test("#1 or #2 are not displayed", () => {
    const { getPhoneNumberPriorityField } = renderer({
      contact: {
        ...contact,
        primaryPhoneNumber: "123456789",
      },
      phoneNumber: "123456789",
    })

    expect(getPhoneNumberPriorityField()).not.toBeInTheDocument()
  })
})
