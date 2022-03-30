/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactRepository } from "App/contacts/repositories/contact.repository"
import { ContactModel } from "App/contacts/models"

const contactModel = {
  delete: jest.fn(),
} as unknown as ContactModel

const subject = new ContactRepository(contactModel)

describe("`ContactRepository`", () => {
  test("fire `delete` call `contactModel.delete` with string argument", () => {
    subject.delete(1)
    expect(contactModel.delete).toHaveBeenCalledWith("1")
  })
})
