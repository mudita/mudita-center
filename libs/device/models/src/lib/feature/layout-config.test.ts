/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { layoutSchema } from "./layout-config"

describe("layoutSchema", () => {
  it("validates layout with margin and padding", () => {
    const validData = {
      margin: "10px 5px",
      padding: "5px 10px",
    }
    expect(layoutSchema.safeParse(validData).success).toBe(true)
  })

  it("validates grid layout with all optional fields", () => {
    const validData = {
      gridLayout: {
        rows: ["1fr", "2fr"],
        columns: ["1fr", "2fr"],
        justifyContent: "center",
        justifyItems: "stretch",
        alignItems: "baseline",
        rowGap: "10px",
        columnGap: "10px",
      },
    }
    expect(layoutSchema.safeParse(validData).success).toBe(true)
  })

  it("validates flex layout with all optional fields", () => {
    const validData = {
      flexLayout: {
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "stretch",
        wrap: "wrap",
        rowGap: "10px",
        columnGap: "10px",
      },
    }
    expect(layoutSchema.safeParse(validData).success).toBe(true)
  })

  it("validates layout with grid and flex placement", () => {
    const validData = {
      gridPlacement: {
        row: 1,
        column: 2,
        width: 3,
        height: 4,
      },
      flexPlacement: {
        grow: 1,
        shrink: 0,
        basis: "auto",
        order: 1,
        alignSelf: "center",
      },
    }
    expect(layoutSchema.safeParse(validData).success).toBe(true)
  })

  it("fails validation for invalid grid layout justifyContent value", () => {
    const invalidData = {
      gridLayout: {
        rows: ["1fr", "2fr"],
        columns: ["1fr", "2fr"],
        justifyContent: "invalid",
      },
    }
    expect(layoutSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for invalid flex layout direction value", () => {
    const invalidData = {
      flexLayout: {
        direction: "invalid",
      },
    }
    expect(layoutSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for missing required gridPlacement fields", () => {
    const invalidData = {
      gridPlacement: {
        row: 1,
      },
    }
    expect(layoutSchema.safeParse(invalidData).success).toBe(false)
  })
})
