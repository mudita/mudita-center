/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const filesEntitiesConfiguration = {
  globalValidators: { requiredFieldsCombinations: [] },
  fields: {
    id: { type: "id" },
    filePath: { type: "string", validators: [{ required: true }] },
    fileName: { type: "string", validators: [{ required: true }] },
    extension: { type: "string", validators: [{ required: true }] },
    fileSize: { type: "number", validators: [{ required: true }] },
    fileType: { type: "string", validators: [{ required: true }] },
    mimeType: { type: "string", validators: [{ required: true }] },
    isInternal: { type: "boolean" },
    entityType: { type: "string", validators: [{ required: true }] },
  },
}

export const contactsEntitiesConfiguration = {
  globalValidators: {
    requiredFieldsCombinations: [
      {
        fields: ["phoneNumbers"],
        countLogic: "lt",
        fieldsCount: 3,
        error: "A maximum of two phone numbers can be provided.",
      },
    ],
  },
  fields: {
    contactId: {
      type: "id",
    },
    firstName: {
      type: "string",
      validators: [
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "First name must start with printable character",
        },
      ],
    },
    lastName: {
      type: "string",
      validators: [
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Last name must start with printable character",
        },
      ],
    },
    namePrefix: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Prefix must start with printable character",
        },
      ],
    },
    middleName: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Middle name must start with printable character",
        },
      ],
    },
    nameSuffix: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Suffix must start with printable character",
        },
      ],
    },
    phoneNumbers: {
      type: "array",
      items: {
        type: "object",
        fields: {
          id: {
            type: "id",
          },
          phoneNumber: {
            type: "string",
            validators: [
              {
                required: true,
              },
              {
                pattern:
                  "/^(\\+?\\d{1,3}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$/",
                negatePattern: false,
                error: "Invalid phone number format",
              },
            ],
          },
          phoneType: {
            type: "string",
            validators: [
              {
                required: true,
              },
              {
                pattern: "/^(MOBILE|HOME|WORK|OTHER|UNKNOWN$/i",
                negatePattern: false,
                error: "Invalid phone type",
              },
            ],
          },
        },
        validators: [
          {
            unique: true,
            error: "Given phone object is not unique inside the array",
          },
          {
            pattern:
              '/^\\{"id":"[^"]+","phoneNumber":"[^"]+","phoneType":"[^"]+"\\}$/',
            negatePattern: false,
            error: "Phone data is invalid",
          },
        ],
      },
      validators: [
        {
          required: false,
        },
      ],
    },
    emailAddresses: {
      type: "array",
      items: {
        type: "object",
        fields: {
          id: {
            type: "id",
          },
          emailAddress: {
            type: "string",
            validators: [
              {
                required: true,
              },
              {
                pattern: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/",
                negatePattern: false,
                error: "Invalid email address",
              },
            ],
          },
          emailType: {
            type: "string",
            validators: [
              {
                required: true,
              },
              {
                pattern: "/^(HOME|WORK|OTHER|UNKNOWN$/i",
                negatePattern: false,
                error: "Invalid email address type",
              },
            ],
          },
        },
        validators: [
          {
            unique: true,
            error: "Given email object is not unique inside the array",
          },
          {
            pattern:
              '/^\\{"id":"[^"]+","emailAddress":"[^"]+","emailType":"[^"]+"\\}$/',
            negatePattern: false,
            error: "Email data is invalid",
          },
        ],
      },
      validators: [
        {
          required: false,
        },
      ],
    },
    nickName: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Nickname must start with printable character",
        },
      ],
    },
    company: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Company name must start with printable character",
        },
      ],
    },
    department: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Department name must start with printable character",
        },
      ],
    },
    workTitle: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Work title must start with printable character",
        },
      ],
    },
    address: {
      type: "array",
      items: {
        type: "object",
        fields: {
          streetAddress: {
            type: "string",
            validators: [
              {
                required: false,
              },
              {
                pattern: "/^[^\\s].*/",
                negatePattern: false,
                error: "Street address must start with printable character",
              },
            ],
          },
          secondStreetAddress: {
            type: "string",
            validators: [
              {
                required: false,
              },
              {
                pattern: "/^[^\\s].*/",
                negatePattern: false,
                error: "Street address must start with printable character",
              },
            ],
          },
          poBox: {
            type: "string",
            validators: [
              {
                required: false,
              },
              {
                pattern: "/^[^\\s].*/",
                negatePattern: false,
                error: "POBox must start with printable character",
              },
            ],
          },
          city: {
            type: "string",
            validators: [
              {
                required: false,
              },
              {
                pattern: "/^[^\\s].*/",
                negatePattern: false,
                error: "City name must start with printable character",
              },
            ],
          },
          state: {
            type: "string",
            validators: [
              {
                required: false,
              },
              {
                pattern: "/^[^\\s].*/",
                negatePattern: false,
                error: "State must start with printable character",
              },
            ],
          },
          country: {
            type: "string",
            validators: [
              {
                required: false,
              },
              {
                pattern: "/^[^\\s].*/",
                negatePattern: false,
                error: "Country must start with printable character",
              },
            ],
          },
          zipCode: {
            type: "string",
            validators: [
              {
                required: false,
              },
              {
                pattern: "/^[^\\s].*/",
                negatePattern: false,
                error: "Zip code must start with printable character",
              },
            ],
          },
          type: {
            type: "string",
            validators: [
              {
                required: false,
              },
              {
                pattern: "/^(HOME|WORK|OTHER|UNKNOWN$/i",
                negatePattern: false,
                error: "Invalid address type",
              },
            ],
          },
        },
      },
      validators: [
        {
          required: false,
        },
      ],
    },
    website: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern:
            "/^(https?=\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(\\/[^\\s]*)?$/i\n",
          negatePattern: false,
          error: "Invalid website URL",
        },
      ],
    },
    notes: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^$/",
          negatePattern: true,
        },
      ],
    },
    starred: {
      type: "boolean",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^TRUE|FALSE$/i",
          negatePattern: false,
        },
      ],
    },
    entityType: {
      type: "string",
      validators: [
        {
          required: true,
        },
      ],
      defaultValue: "contacts",
    },
    sip: {
      type: "string",
      validators: [
        {
          required: false,
        },
        {
          pattern: "/^[^\\s].*/",
          negatePattern: false,
          error: "Sip must start with printable character",
        },
      ],
    },
    searchName: {
      type: "string",
    },
    displayName1: {
      type: "string",
    },
    displayName2: {
      type: "string",
    },
    displayName3: {
      type: "string",
    },
    displayName4: {
      type: "string",
    },
    sortField: {
      type: "string",
    },
  },
}
