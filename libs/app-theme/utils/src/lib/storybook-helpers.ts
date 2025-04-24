/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { InputType } from "@storybook/core/csf"
import { merge } from "lodash"
import { ButtonType } from "app-theme/models"

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
  generateEnumSelector(enumObj: object, enumName: string, optional = false) {
    const hasNumericValues = Object.values(enumObj).some((value) => {
      return typeof value === "number" && !isNaN(value)
    })
    merge(this.config, {
      options: [
        ...(optional ? ["none"] : []),
        ...Object.values(enumObj).filter((value) =>
          hasNumericValues
            ? typeof value === "number"
            : typeof value === "string"
        ),
      ],
      control: {
        type: "select",
        labels: {
          ...(optional ? { none: "" } : {}),
          ...Object.fromEntries(
            Object.entries(enumObj).map(([key, value]) => [
              value,
              `${enumName}.${key}`,
            ])
          ),
        },
      },
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
