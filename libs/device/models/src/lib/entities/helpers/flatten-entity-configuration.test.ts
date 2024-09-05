/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { flattenEntityConfiguration } from "./flatten-entity-configuration"
import { EntitiesConfig } from "device/models"

describe("flattenEntityConfiguration", () => {
  it("handles objects with non-object values correctly", () => {
    const input: EntitiesConfig["fields"] = {
      a: {
        type: "id",
      },
      b: {
        type: "string",
      },
      c: {
        type: "number",
      },
      d: {
        type: "boolean",
      },
    }
    expect(flattenEntityConfiguration(input)).toEqual({
      a: "id",
      b: "string",
      c: "number",
      d: "boolean",
    })
  })

  it("converts a simple nested object to dot notation correctly", () => {
    const input: EntitiesConfig["fields"] = {
      a: {
        type: "object",
        fields: {
          b: {
            type: "object",
            fields: {
              c: {
                type: "string",
              },
            },
          },
        },
      },
    }
    expect(flattenEntityConfiguration(input)).toEqual({
      a: "object",
      "a.b": "object",
      "a.b.c": "string",
    })
  })

  it("handles objects with nested arrays correctly", () => {
    const input: EntitiesConfig["fields"] = {
      a: {
        type: "object",
        fields: {
          b: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    }
    expect(flattenEntityConfiguration(input)).toEqual({
      a: "object",
      "a.b": "array",
      "a.b[]": "string",
    })
  })

  it("handles arrays with nested arrays correctly", () => {
    const input: EntitiesConfig["fields"] = {
      a: {
        type: "array",
        items: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    }
    expect(flattenEntityConfiguration(input)).toEqual({
      a: "array",
      "a[]": "array",
      "a[][]": "string",
    })
  })

  it("handles arrays with nested objects correctly", () => {
    const input: EntitiesConfig["fields"] = {
      a: {
        type: "array",
        items: {
          type: "object",
          fields: {
            b: {
              type: "string",
            },
          },
        },
      },
    }
    expect(flattenEntityConfiguration(input)).toEqual({
      a: "array",
      "a[]": "object",
      "a[].b": "string",
    })
  })

  it("excludes 'validators' key", () => {
    const input: EntitiesConfig["fields"] = {
      a: {
        type: "string",
        validators: [],
      },
      b: {
        type: "object",
        validators: [],
        fields: {
          c: {
            type: "string",
            validators: [],
          },
        },
      },
    }
    expect(flattenEntityConfiguration(input, "")).toEqual({
      a: "string",
      b: "object",
      "b.c": "string",
    })
  })

  it("handles empty objects correctly", () => {
    const input: EntitiesConfig["fields"] = {}
    expect(flattenEntityConfiguration(input)).toEqual({})
  })

  it("handles nested objects with mixed types", () => {
    const input: EntitiesConfig["fields"] = {
      a: {
        type: "object",
        fields: {
          b: {
            type: "string",
          },
          c: {
            type: "number",
          },
          d: {
            type: "boolean",
          },
        },
      },
    }
    expect(flattenEntityConfiguration(input)).toEqual({
      a: "object",
      "a.b": "string",
      "a.c": "number",
      "a.d": "boolean",
    })
  })
})
