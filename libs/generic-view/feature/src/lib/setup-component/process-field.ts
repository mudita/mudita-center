/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderField } from "device/models"
import {
  flatten,
  get,
  isArray,
  isNumber,
  isObject,
  isString,
  map,
} from "lodash"

export const processField = (
  field: Partial<DataProviderField>,
  value: unknown
) => {
  let newValue = value
  if ("slice" in field && field.slice !== undefined && value instanceof Array) {
    newValue =
      field.slice.length > 1
        ? value.slice(...field.slice)
        : value.slice(field.slice[0])
  }
  if (
    "flat" in field &&
    field.flat !== undefined &&
    newValue instanceof Array
  ) {
    newValue = flattenListByKey(newValue as unknown[], field.flat)
  }
  if (
    "join" in field &&
    field.join !== undefined &&
    newValue instanceof Array
  ) {
    newValue = (newValue as string[]).join(field.join || "")
  }

  if ("modifier" in field) {
    switch (field.modifier) {
      case "length":
        if (!newValue || !value) {
          newValue = 0
        } else if (isString(newValue) || isArray(newValue)) {
          newValue = newValue.length
        } else if (isObject(value)) {
          newValue = Object.keys(value).length
        }
        break
      case "boolean":
        newValue = Boolean(value)
        break
    }
  }
  if ("condition" in field) {
    switch (field.condition) {
      case "eq":
        newValue = newValue === field.value
        break
      case "ne":
        newValue = newValue !== field.value
        break
      case "gt":
        if (isNumber(newValue) && isNumber(field.value)) {
          newValue = newValue > field.value
        }
        break
      case "lt":
        if (isNumber(newValue) && isNumber(field.value)) {
          newValue = newValue < field.value
        }
        break
    }
  }
  return newValue
}

const flattenListByKey = <T>(list: T[], key: string): unknown => {
  return flatten(map(list, (item) => get(item, key, [])))
}
