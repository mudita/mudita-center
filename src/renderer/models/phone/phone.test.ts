import { phoneSeed } from "App/seeds/phone"
import {
  contactTypeGuard,
  contactFactory,
  phoneNumberFormatter,
  contactDatabaseFactory,
} from "Renderer/models/phone/phone.helpers"
import { Contact } from "Renderer/models/phone/phone.typings"

const TEST_CONTACT = { ...phoneSeed.contacts[0] }
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

describe("contactDatabaseFactory tests", () => {
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
})
