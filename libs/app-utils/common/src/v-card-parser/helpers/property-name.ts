/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { splitByDelimiter } from "./split-by-delimiter"

/**
 * Returns the upper cased name of the property a content line holds, without
 * its parameters - "TEL" for "TEL;TYPE=home:123".
 */
export const getPropertyName = (line: string) => {
  const [propertyWithParameters = ""] = splitByDelimiter(line, ":")
  const [name = ""] = splitByDelimiter(propertyWithParameters, ";")
  return name.trim().toUpperCase()
}

/**
 * Matches a content line against a property name. Property names are
 * case-insensitive (RFC 6350 sec. 3.3), and the whole name has to match, so
 * that NOTE or NICKNAME is not taken for N.
 */
export const isProperty = (name: string) => (line: string) =>
  getPropertyName(line) === name

/**
 * Matches any extension property, whose name starts with "X-"
 * (vCard 2.1 sec. 2.8.1, RFC 2426 sec. 3.8, RFC 6350 sec. 6.10).
 */
export const isExtensionProperty = (line: string) =>
  getPropertyName(line).startsWith("X-")
