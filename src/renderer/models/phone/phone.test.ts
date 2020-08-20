import { init } from "@rematch/core"
import selectPlugin from "@rematch/select"

import { phoneSeed } from "App/seeds/phone"
import {
  contactTypeGuard,
  contactFactory,
  phoneNumberFormatter,
  contactDatabaseFactory,
  addContacts,
  removeContact,
  editContact,
} from "Renderer/models/phone/phone.helpers"
import { Contact } from "Renderer/models/phone/phone.typings"
import phone from "Renderer/models/phone/phone"

const TEST_CONTACT = { ...phoneSeed.db[phoneSeed.collection[0]] }
const TEST_CONTACTS_BATCH = phoneSeed.collection
  .slice(0, 10)
  .map((item) => phoneSeed.db[item])
const TEST_EMPTY_CONTACT = { note: "anything" }
const TEST_CONTACT_TO_CLEAN = {
  id: "1ef4e97e-1bf9-43e2-856f-577bf27fab42",
  firstName: "Zakary",
  lastName: "",
  primaryPhoneNumber: "",
  secondaryPhoneNumber: "+82 707 439 683",
  email: "",
  note: "fuga qui minus",
  ice: false,
  favourite: false,
  blocked: false,
  firstAddressLine: "",
  secondAddressLine: "",
}
const TEST_PHONE_NUMBER = "+82 707 439 683"
const TEST_EXPECTED_PHONE_NUMBER = "+82707439683"
const OLD_DB_SHAPE = {
  db: {
    [TEST_CONTACT_TO_CLEAN.id]: TEST_CONTACT_TO_CLEAN,
  },
  collection: [TEST_CONTACT_TO_CLEAN.id],
}

describe("typeGuard tests", () => {
  test("returns true when contact is valid", () => {
    expect(contactTypeGuard(TEST_CONTACT)).toBeTruthy()
  })

  test("returns false when contact is not valid", () => {
    expect(contactTypeGuard(TEST_EMPTY_CONTACT)).toBeFalsy()
  })
})

describe("contactFactory tests", () => {
  test("properly cleans phone numbers", () => {
    expect(
      phoneNumberFormatter({ primaryPhoneNumber: TEST_PHONE_NUMBER })
    ).toMatchObject({
      primaryPhoneNumber: TEST_EXPECTED_PHONE_NUMBER,
    })
  })

  test("creates clean model without empty fields", () => {
    const typeGuardMock = () => true
    const result = (contactFactory(
      TEST_CONTACT_TO_CLEAN,
      typeGuardMock
    ) as unknown) as Contact
    expect(result).toMatchObject({
      id: TEST_CONTACT_TO_CLEAN.id,
      firstName: TEST_CONTACT_TO_CLEAN.firstName,
      secondaryPhoneNumber: TEST_EXPECTED_PHONE_NUMBER,
      note: TEST_CONTACT_TO_CLEAN.note,
    })

    expect("lastName" in result).toBeFalsy()
    expect("primaryPhoneNumber" in result).toBeFalsy()
    expect("email" in result).toBeFalsy()
    expect("ice" in result).toBeFalsy()
    expect("favourite" in result).toBeFalsy()
    expect("blocked" in result).toBeFalsy()
    expect("firstAddressLine" in result).toBeFalsy()
    expect("secondAddressLine" in result).toBeFalsy()
  })

  test("returns null when contact is not assignable", () => {
    expect(contactFactory({})).toBe(null)
  })
})

describe("contactDatabaseFactory and mergeContacts tests", () => {
  test("creates proper shape of database", () => {
    const factoryMock = (input: any) => input
    const result = contactDatabaseFactory(
      [TEST_CONTACT, TEST_CONTACT_TO_CLEAN],
      factoryMock
    )

    expect(result.collection.indexOf(TEST_CONTACT.id) >= 0).toBeTruthy()
    expect(
      result.collection.indexOf(TEST_CONTACT_TO_CLEAN.id) >= 0
    ).toBeTruthy()

    expect(result.db[TEST_CONTACT.id]).toMatchObject(TEST_CONTACT)
    expect(result.db[TEST_CONTACT_TO_CLEAN.id]).toMatchObject(
      TEST_CONTACT_TO_CLEAN
    )
  })

  test("properly merges new data into old one", () => {
    const result = addContacts(OLD_DB_SHAPE, [TEST_CONTACT])

    expect(result.collection).toHaveLength(2)
    expect(
      result.collection.indexOf(TEST_CONTACT_TO_CLEAN.id) >= 0
    ).toBeTruthy()
    expect(result.collection.indexOf(TEST_CONTACT.id) >= 0).toBeTruthy()

    expect(TEST_CONTACT.id in result.db).toBeTruthy()
    expect(TEST_CONTACT_TO_CLEAN.id in result.db).toBeTruthy()
  })

  test("doesn't modify the state if contact is not valid", () => {
    // @ts-ignore –due to passing broken data on purpose
    const result = addContacts(OLD_DB_SHAPE, [{}])

    expect(result.db).toMatchObject(OLD_DB_SHAPE.db)
    expect(result.collection).toHaveLength(OLD_DB_SHAPE.collection.length)
  })

  test("should add contacts in batch", () => {
    const result = addContacts({ db: {}, collection: [] }, TEST_CONTACTS_BATCH)

    expect(result.collection).toHaveLength(TEST_CONTACTS_BATCH.length)
  })

  test("properly removed items from the db", () => {
    const ID_TO_REMOVE = TEST_CONTACT_TO_CLEAN.id
    const result = removeContact(OLD_DB_SHAPE, [ID_TO_REMOVE])
    expect(result.collection).toHaveLength(OLD_DB_SHAPE.collection.length - 1)
    expect(ID_TO_REMOVE in result.db).toBeFalsy()
  })

  test("properly edits contact data", () => {
    const ID_TO_EDIT = TEST_CONTACT_TO_CLEAN.id
    const NEW_NAME = "Zbigniew"

    expect(OLD_DB_SHAPE.db[ID_TO_EDIT].firstName).not.toBe(NEW_NAME)

    const result = editContact(OLD_DB_SHAPE, ID_TO_EDIT, {
      firstName: NEW_NAME,
    })

    expect(result.db[ID_TO_EDIT].firstName).toBe(NEW_NAME)
  })
})

describe("redux tests", () => {
  const storeConfig = {
    models: { phone },
    plugins: [selectPlugin()],
    redux: {
      initialState: {
        phone: phoneSeed,
      },
    },
  }

  let store = init(storeConfig)

  beforeEach(() => {
    store = init(storeConfig)
  })

  test("has proper initial state", () => {
    expect("db" in store.getState().phone)
    expect("db" in store.getState().phone)
  })

  test("creates proper flat list", () => {
    expect(
      Array.isArray(store.select.phone.grouped(store.getState()))
    ).toBeTruthy()
  })
})
