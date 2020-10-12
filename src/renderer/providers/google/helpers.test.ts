import { queryBuilder, contactFactory } from "Renderer/providers/google/helpers"

describe("queryBuilder tests", () => {
  test("properly merges two or more items", () => {
    expect(queryBuilder(["a", "b"])).toBe("a,b")
  })

  test("properly treats input with one item", () => {
    expect(queryBuilder(["a"])).toBe("a")
  })
})

describe("contactFactory tests", () => {
  const id = "people/c3029075528770821092"
  const firstName = "Test"
  const lastName = "Contact"
  const email = "random@contact.com"
  const phoneNumber = "987654321"

  test("creates proper user from provided data", () => {
    const testGoogleContact = {
      resourceName: id,
      etag: "%EgkBAj0JPgs/Ny4aBAECBQciDDlzYjBmN0EwT2x3PQ==",
      names: [
        {
          metadata: {
            primary: true,
            source: {
              type: "CONTACT",
              id: "2a0970250a369be4",
            },
          },
          displayName: `${firstName} ${lastName}`,
          familyName: lastName,
          givenName: firstName,
          displayNameLastFirst: `${lastName}, ${firstName}`,
          unstructuredName: `${firstName} ${lastName}`,
        },
      ],
      emailAddresses: [
        {
          metadata: {
            primary: true,
            source: {
              type: "CONTACT",
              id: "2a0970250a369be4",
            },
          },
          value: email,
        },
      ],
      phoneNumbers: [
        {
          metadata: {
            primary: true,
            source: {
              type: "CONTACT",
              id: "2a0970250a369be4",
            },
          },
          value: phoneNumber,
        },
      ],
    }

    const createdContact = contactFactory(testGoogleContact)

    expect(createdContact?.firstName).toBe(firstName)
    expect(createdContact?.lastName).toBe(lastName)
    expect(createdContact?.email).toBe(email)
    expect(createdContact?.primaryPhoneNumber).toBe(phoneNumber)
  })

  test("throws when contact doesn't have first name or last name", () => {
    const testGoogleContact = {
      resourceName: id,
      etag: "%EgkBAj0JPgs/Ny4aBAECBQciDDlzYjBmN0EwT2x3PQ==",
      emailAddresses: [
        {
          metadata: {
            primary: true,
            source: {
              type: "CONTACT",
              id: "2a0970250a369be4",
            },
          },
          value: email,
        },
      ],
      phoneNumbers: [
        {
          metadata: {
            primary: true,
            source: {
              type: "CONTACT",
              id: "2a0970250a369be4",
            },
          },
          value: phoneNumber,
        },
      ],
    }

    expect(() => contactFactory(testGoogleContact)).toThrowError(
      "Unable to save model, missing name"
    )
  })
})
