/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import elasticlunr from "elasticlunr"
import { AppError } from "App/core/errors"
import { Contact } from "App/contacts/dto"
import { SearcherError } from "App/search/constants"
import { IndexFactory } from "App/index-storage/factories"
import { DataIndex } from "App/index-storage/constants"
import { ContactSearcher } from "App/search/searchers/contact.searcher"

const indexContactMock = elasticlunr<Contact>()
const contactMock: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71195069214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

describe("When index exists", () => {
  const index = new IndexFactory().create()
  const subject = new ContactSearcher(index)

  beforeAll(() => {
    index.set(DataIndex.Contact, indexContactMock)

    indexContactMock.setRef("id")
    indexContactMock.addField("firstName")
    indexContactMock.addField("lastName")
    indexContactMock.addField("primaryPhoneNumber")
    indexContactMock.addField("secondaryPhoneNumber")
    indexContactMock.addField("email")
    indexContactMock.addField("note")
    indexContactMock.addField("ice")
    indexContactMock.addField("favourite")
    indexContactMock.addField("blocked")
    indexContactMock.addField("firstAddressLine")
    indexContactMock.addField("secondAddressLine")

    indexContactMock.addDoc(contactMock)
  })

  test("returns hydrated `contact` list if query match to string in fields", () => {
    expect(subject.search("Malczewskiego")).toEqual([contactMock])
  })

  test("returns hydrated `contact` if query contains only a part of the word", () => {
    expect(subject.search("Malczew")).toEqual([contactMock])
  })

  test("returns empty array if query doesn't match to string in fields", () => {
    expect(subject.search("Hello")).toEqual([])
  })
})

describe("When index doesn't exists", () => {
  const index = new IndexFactory().create()
  const subject = new ContactSearcher(index)

  test("throw an error with `SearcherError.SearcherDoesntExists` type", () => {
    expect(() => subject.search("laborum")).toThrow(
      new AppError(
        SearcherError.SearcherDoesntExists,
        `Index: ${DataIndex.Contact} can't be found`
      )
    )
  })
})
