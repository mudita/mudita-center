/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { generateMcOverviewSummaryLayout } from "./summary"

describe("generateMcOverviewSummaryLayout", () => {
  it("returns undefined when config.show is false", () => {
    const config = { show: false }
    const result = generateMcOverviewSummaryLayout(config)
    expect(result).toBeUndefined()
  })

  it("returns summary layout key properly", () => {
    const config = {
      show: true,
    }
    const result = generateMcOverviewSummaryLayout(config)
    expect(result).toHaveProperty("mc-overview-summary")
  })

  it("returns image layout key properly", () => {
    const config = {
      show: true,
      showImg: true,
    }
    const result = generateMcOverviewSummaryLayout(config)
    expect(result).toHaveProperty("mc-overview-summary-img")
    expect(result?.["mc-overview-summary"].childrenKeys).toContain(
      "mc-overview-summary-img"
    )
  })

  it("returns serial number layout key properly", () => {
    const config = {
      show: true,
      showSerialNumber: true,
    }
    const result = generateMcOverviewSummaryLayout(config)
    expect(result).toHaveProperty("mc-overview-summary-serial-number")
    expect(result?.["mc-overview-summary"].childrenKeys).toContain(
      "mc-overview-summary-serial-number"
    )
  })

  it("returns about layout key properly", () => {
    const config = {
      show: true,
      showAbout: true,
    }
    const result = generateMcOverviewSummaryLayout(config)
    expect(result).toHaveProperty("mc-overview-summary-about-divider")
    expect(result).toHaveProperty("mc-overview-summary-about")
    expect(result?.["mc-overview-summary"].childrenKeys).toContain(
      "mc-overview-summary-about-divider"
    )
    expect(result?.["mc-overview-summary"].childrenKeys).toContain(
      "mc-overview-summary-about"
    )
  })
})
