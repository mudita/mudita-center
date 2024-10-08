/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityComputedFieldConfig, EntityData } from "device/models"
import { computeField } from "./compute-field"

describe("computeField", () => {
  describe("filters fields", () => {
    const entity: EntityData = {
      name: "John",
      surname: "Doe",
      age: 25,
      hobbies: ["reading", "swimming", "running"],
      moreHobbies: ["cycling", "dancing"],
    }
    it("based on a regex pattern", () => {
      const config: EntityComputedFieldConfig = {
        type: "filter",
        pattern: "/Doe/",
        fields: ["name", "surname"],
      }
      expect(computeField(entity, config)).toEqual(["Doe"])
    })
    it("based on a regex pattern with flags", () => {
      const config: EntityComputedFieldConfig = {
        type: "filter",
        pattern: "/^D/m",
        fields: ["name", "surname"],
      }
      expect(computeField(entity, config)).toEqual(["Doe"])
    })
    it("based on a negated regex pattern", () => {
      const config: EntityComputedFieldConfig = {
        type: "filter",
        pattern: "/Doe/",
        negatePattern: true,
        fields: ["name", "surname"],
      }
      expect(computeField(entity, config)).toEqual(["John"])
    })
    it("based on a regex pattern with an array field", () => {
      const config: EntityComputedFieldConfig = {
        type: "filter",
        pattern: "/^r/m",
        fields: ["hobbies[]"],
      }
      expect(computeField(entity, config)).toEqual(["reading", "running"])
    })
  })

  describe("clears fields", () => {
    const entity: EntityData = {
      name: "John",
      surname: "",
      middleName: undefined,
      age: 0,
      isStudent: false,
      address: {},
      hobbies: [],
    }
    const baseConfig: EntityComputedFieldConfig = {
      type: "clear",
      fields: [
        "name",
        "surname",
        "age",
        "isStudent",
        "address",
        "hobbies",
        "job",
      ],
    }
    it("with default conditions", () => {
      const config: EntityComputedFieldConfig = baseConfig
      expect(computeField(entity, config)).toEqual(["John"])
    })
    it("with default conditions and an array field", () => {
      const entityWithArray: EntityData = {
        ...entity,
        test: [1, "", 3],
      }
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        fields: ["test[]"],
      }
      expect(computeField(entityWithArray, config)).toEqual([1, 3])
    })
    it("with empty strings allowed", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        allowEmptyString: true,
      }
      expect(computeField(entity, config)).toEqual(["John", ""])
    })
    it("with zeros allowed", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        allowZero: true,
      }
      expect(computeField(entity, config)).toEqual(["John", 0])
    })
    it("with false values allowed", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        allowFalse: true,
      }
      expect(computeField(entity, config)).toEqual(["John", false])
    })
  })

  describe("slices fields", () => {
    const entity: EntityData = {
      name: "John",
      surname: "Doe",
      age: 25,
      hobbies: ["reading", "swimming", "running"],
    }
    const baseConfig: EntityComputedFieldConfig = {
      type: "slice",
      fields: ["name", "surname", "age"],
    }
    it("with default conditions", () => {
      const config: EntityComputedFieldConfig = baseConfig
      expect(computeField(entity, config)).toEqual(["John", "Doe", 25])
    })
    it("with start index", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        start: 1,
      }
      expect(computeField(entity, config)).toEqual(["Doe", 25])
    })
    it("with end index", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        end: 2,
      }
      expect(computeField(entity, config)).toEqual(["John", "Doe"])
    })
    it("with start and end index", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        start: 1,
        end: 2,
      }
      expect(computeField(entity, config)).toEqual(["Doe"])
    })
    it("with negative start index", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        start: -1,
      }
      expect(computeField(entity, config)).toEqual([25])
    })
    it("with negative end index", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        end: -1,
      }
      expect(computeField(entity, config)).toEqual(["John", "Doe"])
    })
    it("with negative start and end index", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        start: -2,
        end: -1,
      }
      expect(computeField(entity, config)).toEqual(["Doe"])
    })
    it("with an array field", () => {
      const config: EntityComputedFieldConfig = {
        type: "slice",
        fields: ["hobbies[]"],
        start: 1,
        end: 2,
      }
      expect(computeField(entity, config)).toEqual(["swimming"])
    })
  })

  describe("joins fields", () => {
    const entity: EntityData = {
      name: "John",
      surname: "Doe",
      age: 25,
      hobbies: ["reading", "swimming", "running"],
      moreHobbies: ["cycling", "dancing"],
    }
    const baseConfig: EntityComputedFieldConfig = {
      type: "join",
      fields: ["name", "surname"],
    }
    it("with default conditions", () => {
      const config: EntityComputedFieldConfig = baseConfig
      expect(computeField(entity, config)).toEqual("JohnDoe")
    })
    it("with a separator", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        separator: " ",
      }
      expect(computeField(entity, config)).toEqual("John Doe")
    })
    it("with field as an array of strings", () => {
      const config: EntityComputedFieldConfig = {
        type: "join",
        fields: ["hobbies"],
        separator: ",",
      }
      expect(computeField(entity, config)).toEqual("reading,swimming,running")
    })
    it("with field as an array of arrays", () => {
      const config: EntityComputedFieldConfig = {
        type: "join",
        fields: ["hobbies", "moreHobbies"],
        separator: ",",
      }
      expect(computeField(entity, config)).toEqual(
        "reading,swimming,running,cycling,dancing"
      )
    })
    it("throws an error if a field is not a string, number or array", () => {
      const customEntity: EntityData = {
        ...entity,
        name: { first: "John", last: "Doe" },
      }
      const config: EntityComputedFieldConfig = {
        type: "join",
        fields: ["middleName", "name"],
      }
      expect(() => computeField(customEntity, config)).toThrow(
        "Join method can be used only with arrays, strings and numbers."
      )
    })
  })

  describe("concatenates fields", () => {
    const entity: EntityData = {
      name: "John",
      surname: "Doe",
      age: 25,
      hobbies: ["reading", "swimming", "running"],
      moreHobbies: ["cycling", "dancing"],
    }
    const baseConfig: EntityComputedFieldConfig = {
      type: "concat",
      fields: ["hobbies", "moreHobbies"],
    }
    it("with default conditions", () => {
      const config: EntityComputedFieldConfig = baseConfig
      expect(computeField(entity, config)).toEqual([
        "reading",
        "swimming",
        "running",
        "cycling",
        "dancing",
      ])
    })
    it("with field as a string", () => {
      const config: EntityComputedFieldConfig = {
        type: "concat",
        fields: ["name", "surname"],
      }
      expect(computeField(entity, config)).toEqual(["John", "Doe"])
    })
  })

  describe("merges fields", () => {
    const entity: EntityData = {
      name: {
        first: "John",
        last: "Doe",
      },
      health: {
        height: 180,
        weight: 75,
        age: 25,
      },
      hobbies: ["reading", "swimming", "running"],
      moreHobbies: ["cycling", "dancing"],
    }
    const baseConfig: EntityComputedFieldConfig = {
      type: "merge",
      fields: ["name", "health"],
    }
    it("with default conditions", () => {
      const config: EntityComputedFieldConfig = baseConfig
      expect(computeField(entity, config)).toEqual({
        first: "John",
        last: "Doe",
        height: 180,
        weight: 75,
        age: 25,
      })
    })
  })

  describe("wraps fields", () => {
    const entity: EntityData = {
      name: "John",
      surname: "Doe",
      age: 25,
      hobbies: ["reading", "swimming", "running"],
    }
    const baseConfig: EntityComputedFieldConfig = {
      type: "wrap",
      fields: ["name", "surname"],
    }
    it("with prefix", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        prefix: "Mr. ",
      }
      expect(computeField(entity, config)).toEqual(["Mr. ", "John", "Doe"])
    })
    it("with suffix", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        suffix: " Sr.",
      }
      expect(computeField(entity, config)).toEqual(["John", "Doe", " Sr."])
    })
    it("with prefix and suffix", () => {
      const config: EntityComputedFieldConfig = {
        ...baseConfig,
        prefix: "Mr. ",
        suffix: " Sr.",
      }
      expect(computeField(entity, config)).toEqual([
        "Mr. ",
        "John",
        "Doe",
        " Sr.",
      ])
    })
    it("with an array field", () => {
      const config: EntityComputedFieldConfig = {
        type: "wrap",
        fields: ["hobbies"],
        prefix: "prefix",
        suffix: "suffix",
      }
      expect(computeField(entity, config)).toEqual([
        "prefix",
        ["reading", "swimming", "running"],
        "suffix",
      ])
    })
    it("with an array of arrays field", () => {
      const config: EntityComputedFieldConfig = {
        type: "wrap",
        fields: ["hobbies[]"],
        prefix: "prefix",
        suffix: "suffix",
      }
      expect(computeField(entity, config)).toEqual([
        "prefix",
        "reading",
        "swimming",
        "running",
        "suffix",
      ])
    })
    it("with object prefix and suffix", () => {
      const config: EntityComputedFieldConfig = {
        type: "wrap",
        fields: ["hobbies[]"],
        prefix: { prefix: "prefix" },
        suffix: { suffix: "suffix" },
      }
      expect(computeField(entity, config)).toEqual([
        { prefix: "prefix" },
        "reading",
        "swimming",
        "running",
        { suffix: "suffix" },
      ])
    })
  })

  describe("objectifies fields", () => {
    const entity: EntityData = {
      name: "John",
      surname: "Doe",
      age: 25,
      hobbies: ["reading", "swimming", "running"],
    }
    const baseConfig: EntityComputedFieldConfig = {
      type: "objectify",
      keys: ["n", "s"],
      fields: ["name", "surname"],
    }
    it("with simple fields", () => {
      const config: EntityComputedFieldConfig = baseConfig
      expect(computeField(entity, config)).toEqual({
        n: "John",
        s: "Doe",
      })
    })
    it("with an array field", () => {
      const config: EntityComputedFieldConfig = {
        type: "objectify",
        keys: ["hobbies"],
        fields: ["hobbies"],
      }
      expect(computeField(entity, config)).toEqual({
        hobbies: ["reading", "swimming", "running"],
      })
    })
    it("with an array of arrays field", () => {
      const config: EntityComputedFieldConfig = {
        type: "objectify",
        keys: ["first", "second"],
        fields: ["hobbies[]"],
      }
      expect(computeField(entity, config)).toEqual({
        first: "reading",
        second: "swimming",
      })
    })
  })

  it("supports nested fields configuration", () => {
    const entity: EntityData = {
      name: "John",
      surname: "Doe",
      age: 25,
      hobbies: ["reading", "swimming", "running"],
      moreHobbies: ["cycling", "dancing"],
    }
    const config: EntityComputedFieldConfig = {
      type: "join",
      separator: ",",
      fields: [
        {
          type: "filter",
          pattern: "/^r/m",
          fields: ["hobbies[]"],
        },
        {
          type: "filter",
          pattern: "/^d/m",
          fields: ["moreHobbies[]"],
        },
      ],
    }
    expect(computeField(entity, config)).toEqual("reading,running,dancing")
  })
})
