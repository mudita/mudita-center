/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { InputType } from "@storybook/core/csf"
import { merge } from "lodash"

export const storybookHelper = {
  config: {} as InputType,

  // Assigns control to given category in Storybook's side panel
  assignCategory(category: "Functional" | "Styles" | string) {
    merge(this.config, {
      table: {
        category,
      },
    })
    return this
  },

  // Assigns selector control with options mapped to enum keys
  generateEnumSelector(enumObj: object, enumName = "enum") {
    merge(this.config, {
      control: { type: "select" },
      options: Object.values(enumObj).filter((v) => typeof v === "string"),
      mapping: Object.fromEntries(
        Object.keys(enumObj).map((key) => [
          key,
          enumObj[key as keyof typeof enumObj],
        ])
      ),
    })
    return this.setType(enumName)
  },

  setType(type: string, details?: string) {
    merge(this.config, {
      table: {
        type: { summary: type, detail: details },
      },
    })
    return this
  },

  addDescription(description: string) {
    merge(this.config, {
      description,
    })
    return this
  },

  disableControl() {
    merge(this.config, {
      table: {
        disable: true,
      },
    })
    return this
  },

  // Merges additional configuration with previous ones and clears the config
  apply(customConfig: InputType = {}) {
    const finalConfig = merge({}, this.config, customConfig)
    this.config = {}
    return finalConfig
  },
}
