/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "generic-view/utils"
import {
  DetailListModalConfig,
  DetailListTextConfig,
  DetailListTextConfigValidator,
  DetailListModalConfigValidator,
  UpdateTileConfig,
  UpdateTileConfigValidator,
  DataSyncTileConfig,
  DataSyncTileConfigValidator,
  IconTextRowConfig,
  IconTextRowConfigValidator,
  TileListConfig,
  TileListConfigValidator,
  OverviewConfig,
  OverviewConfigValidator,
} from "./overview-config"

const minimumDetailListTextConfig: DetailListTextConfig = {
  dataKey: "key",
  type: "detail-list-text",
  title: "title",
}

describe("DetailListTextConfig", () => {
  it("should return success when correct config is validated", () => {
    const dataToParse = { ...minimumDetailListTextConfig }
    const result = DetailListTextConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it.each(["dataKey", "title"])(
    "should return fail when %s is empty string",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumDetailListTextConfig }
      dataToParse[fieldName] = ""
      const result = DetailListTextConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it.each(["dataKey", "type", "title"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumDetailListTextConfig }
      delete dataToParse[fieldName]
      const result = DetailListTextConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
})

const minimumDetailListModalConfig: DetailListModalConfig = {
  dataKey: "key",
  type: "detail-list-modal",
  title: "title",
  buttonText: "buttonText",
}

describe("DetailListModalConfig", () => {
  it("should return success when correct config is validated", () => {
    const dataToParse = { ...minimumDetailListModalConfig }
    const result = DetailListModalConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it.each(["dataKey", "title", "buttonText"])(
    "should return fail when %s is empty string",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumDetailListModalConfig }
      dataToParse[fieldName] = ""
      const result = DetailListModalConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it.each(["dataKey", "type", "title", "buttonText"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumDetailListModalConfig }
      delete dataToParse[fieldName]
      const result = DetailListModalConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
})

const minimumUpdateTileConfigConfig: UpdateTileConfig = {
  dataKey: "key",
  type: "mc-overview-update",
  title: "title",
  currentVersionKey: "currentVersionKey",
  showBadge: true,
  versionLabel: "versionLabel",
}

describe("UpdateTileConfig", () => {
  it("should return success when correct config is validated", () => {
    const dataToParse = { ...minimumUpdateTileConfigConfig }
    const result = UpdateTileConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it.each(["dataKey", "title", "currentVersionKey", "versionLabel"])(
    "should return fail when %s is empty string",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumUpdateTileConfigConfig }
      dataToParse[fieldName] = ""
      const result = UpdateTileConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it.each([
    "dataKey",
    "type",
    "title",
    "currentVersionKey",
    "showBadge",
    "versionLabel",
  ])("should return fail when %s is missing", (fieldName) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToParse: any = { ...minimumUpdateTileConfigConfig }
    delete dataToParse[fieldName]
    const result = UpdateTileConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeFalsy()
  })
})

const minimumDataSyncTileConfig: DataSyncTileConfig = {
  type: "mc-overview-sync",
  title: "title",
  buttonText: "buttonText",
  fieldsToSync: ["currentDateISO"],
}

describe("DataSyncTileConfig", () => {
  it("should return success when correct config is validated", () => {
    const dataToParse = { ...minimumDataSyncTileConfig }
    const result = DataSyncTileConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when fieldsToSync array is empty", () => {
    const dataToParse = { ...minimumDataSyncTileConfig }
    dataToParse.fieldsToSync = []
    const result = DataSyncTileConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeFalsy()
  })
  it.each(["title", "buttonText"])(
    "should return fail when %s is empty string",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumDataSyncTileConfig }
      dataToParse[fieldName] = ""
      const result = DataSyncTileConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it.each(["type", "title", "buttonText", "fieldsToSync"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumDataSyncTileConfig }
      delete dataToParse[fieldName]
      const result = DataSyncTileConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
})

const minimumIconTextRowConfig: IconTextRowConfig = {
  type: "icon-text",
  dataKey: "dataKey",
}

describe("IconTextRowConfig", () => {
  it("should return success when correct config is validated", () => {
    const dataToParse = { ...minimumIconTextRowConfig }
    const result = IconTextRowConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it.each(["dataKey"])(
    "should return fail when %s is empty string",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumIconTextRowConfig }
      dataToParse[fieldName] = ""
      const result = IconTextRowConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it.each(["type", "dataKey"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumIconTextRowConfig }
      delete dataToParse[fieldName]
      const result = IconTextRowConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
})

const minimumTileListConfig: TileListConfig = {
  dataKey: "key",
  type: "tile-list",
  title: "title",
  fields: [],
}

describe("TileListConfig", () => {
  it("should return success when correct config is validated", () => {
    const dataToParse = { ...minimumTileListConfig }
    const result = TileListConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it.each(["dataKey"])(
    "should return fail when %s is empty string",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumTileListConfig }
      dataToParse[fieldName] = ""
      const result = TileListConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it.each(["dataKey", "type", "fields"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumTileListConfig }
      delete dataToParse[fieldName]
      const result = TileListConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
})

const minimumOverviewConfig: OverviewConfig = {
  title: "title",
  summary: {},
}

const allFieldsOverviewConfig: OverviewConfig = {
  title: "title",
  summary: {
    show: true,
    showImg: true,
    imgVariant: "imgVariant",
    showSerialNumber: true,
    serialNumberLabel: "serialNumberLabel",
    showDeviceVersion: true,
    deviceVersionLabel: "deviceVersionLabel",
    showAbout: true,
    aboutTitle: "aboutTitle",
    aboutSubtitle: "aboutSubtitle",
    aboutIcon: IconType.AirplaneMode,
    aboutFields: [{ ...minimumDetailListModalConfig }],
  },
  sections: [
    { ...minimumTileListConfig },
    { ...minimumUpdateTileConfigConfig },
    { ...minimumDataSyncTileConfig },
  ],
}

describe("OverviewConfig", () => {
  it("should return success when correct config is validated", () => {
    const dataToParse = { ...minimumOverviewConfig }
    const result = OverviewConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it("should return success when correct config with all fields is validated", () => {
    const dataToParse = { ...allFieldsOverviewConfig }
    const result = OverviewConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it("should return success when correct config with all fields is validated", () => {
    const dataToParse = { ...minimumOverviewConfig }
    const result = OverviewConfigValidator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it.each(["title"])(
    "should return fail when %s is empty string",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumOverviewConfig }
      dataToParse[fieldName] = ""
      const result = OverviewConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it.each(["title", "summary"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumOverviewConfig }
      delete dataToParse[fieldName]
      const result = OverviewConfigValidator.safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
})
