/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Resolves escape sequences in a single pass, so that an escaped backslash
 * followed by an "n" stays a backslash and an "n" instead of turning into a
 * new line. A sequence the version does not define is left as written.
 */
const unescape = (
  value: string,
  escapable: string,
  newLineEscape: boolean
): string =>
  value.replace(/\\(.)/g, (match, char: string) => {
    if (newLineEscape && (char === "n" || char === "N")) {
      return "\n"
    }
    return escapable.includes(char) ? char : match
  })

/**
 * Reverses the escaping of a vCard 3.0 or 4.0 text value: a backslash, a comma
 * and a semicolon are escaped with a backslash, and "\n" (or "\N") stands for
 * a new line (RFC 2425 sec. 5.8.4, RFC 2426 sec. 2.5, RFC 6350 sec. 3.4).
 *
 * Only text values are escaped this way - URI values such as URL or a tel URI
 * are not, so they must not be passed here.
 */
export const unescapeValue = (value = "") => unescape(value, "\\,;", true)

/**
 * Reverses the escaping of a vCard 2.1 value. That version escapes the
 * semicolon and nothing else - "A Semi-colon in a component of a compound
 * property value must be escaped with a Backslash character (ASCII 92)" - so a
 * backslash in front of any other character is literal content and has to stay
 * (vCard 2.1 sec. 2.1.3, "Delimiters").
 */
export const unescapeSemicolon = (value = "") => unescape(value, ";", false)
