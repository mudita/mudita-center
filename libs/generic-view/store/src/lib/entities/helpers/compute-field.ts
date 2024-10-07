/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityComputedFieldConfig, EntityData } from "device/models"
import {
  concat,
  get,
  isArray,
  isNumber,
  isObject,
  isString,
  join,
  merge,
  slice,
} from "lodash"
import { stringToRegex } from "generic-view/utils"

export const computeField = (
  entity: EntityData,
  config: EntityComputedFieldConfig
): unknown => {
  const { type, fields } = config

  const values = fields.reduce((acc: unknown[], field) => {
    if (typeof field === "string") {
      if (field.endsWith("[]")) {
        return [...acc, ...(get(entity, field.slice(0, -2)) as unknown[])]
      }
      acc.push(get(entity, field))
      return acc
    }
    acc.push(computeField(entity, field))
    return acc
  }, [])

  switch (type) {
    case "filter": {
      const regex = stringToRegex(config.pattern)
      return values.filter((value) => {
        const matches = regex.test(
          isString(value) ? value : JSON.stringify(value)
        )
        return config.negatePattern ? !matches : matches
      })
    }
    case "clear": {
      return values.filter((value) => {
        const emptyStringCondition = config.allowEmptyString || value !== ""
        const zeroCondition = config.allowZero || value !== 0
        const falseCondition = config.allowFalse || value !== false
        const undefinedCondition = value !== undefined
        const emptyArrayCondition = isArray(value) ? value.length !== 0 : true
        const emptyObjectCondition = isObject(value)
          ? Object.keys(value).length !== 0
          : true
        return (
          undefinedCondition &&
          emptyStringCondition &&
          emptyArrayCondition &&
          emptyObjectCondition &&
          zeroCondition &&
          falseCondition
        )
      })
    }
    case "slice":
      return slice(values, config.start, config.end)
    case "join": {
      if (
        values.every(
          (value) => isNumber(value) || isString(value) || isArray(value)
        )
      ) {
        return join(values, config.separator ?? "")
      }
      throw new Error(
        "Join method can be used only with arrays, strings and numbers."
      )
    }
    case "concat": {
      return concat(...values)
    }
    case "merge": {
      return merge({}, ...values)
    }
    case "wrap": {
      return [
        ...(config.prefix ? [config.prefix] : []),
        ...values,
        ...(config.suffix ? [config.suffix] : []),
      ]
    }
    case "objectify": {
      return values.reduce((acc: Record<string, unknown>, value, index) => {
        const key = config.keys[index]
        if (!key) {
          return acc
        }
        acc[key] = value
        return acc
      }, {})
    }
  }
}
