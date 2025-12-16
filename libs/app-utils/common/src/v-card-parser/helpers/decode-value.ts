/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as iconv from "iconv-lite"

/**
 * Decodes a single-line text value based on the specified character set and encoding type.
 * Supports vCard 2.1 and 3.0 encoding formats.
 * @param value - The encoded value to decode
 * @param charset - The character set (e.g., 'utf-8', 'iso-8859-1', 'iso-8859-2', 'windows-1250')
 * @param encodingType - The encoding type ('QUOTED-PRINTABLE', 'BASE64', 'B', 'Q', or empty)
 */
export const decodeValue = (
  value: string,
  charset = "",
  encodingType = ""
): string => {
  const normalizedEncoding = encodingType.toUpperCase()
  const normalizedCharset = normalizeCharset(charset)

  if (normalizedEncoding === "QUOTED-PRINTABLE" || normalizedEncoding === "Q") {
    return decodeQuotedPrintable(value, normalizedCharset)
  }

  if (normalizedEncoding === "BASE64" || normalizedEncoding === "B") {
    return decodeBase64(value, normalizedCharset)
  }

  return value
}

const normalizeCharset = (charset: string): string => {
  const normalized = charset.toLowerCase().replace(/[_-]/g, "")

  const charsetMap: Record<string, string> = {
    utf8: "utf-8",
    usascii: "ascii",
    iso88591: "iso-8859-1",
    iso88592: "iso-8859-2",
    iso885915: "iso-8859-15",
    latin1: "iso-8859-1",
    latin2: "iso-8859-2",
    windows1250: "windows-1250",
    windows1251: "windows-1251",
    windows1252: "windows-1252",
    cp1250: "windows-1250",
    cp1251: "windows-1251",
    cp1252: "windows-1252",
    win1250: "windows-1250",
    win1251: "windows-1251",
    win1252: "windows-1252",
  }

  return charsetMap[normalized] || charset
}

const decodeQuotedPrintable = (value: string, charset: string): string => {
  try {
    // Remove soft line breaks (= followed by line ending)
    const withoutSoftBreaks = value.replace(/=\r?\n/g, "")

    // Decode QP: replace =XX with the byte value
    const bytes: number[] = []
    let i = 0
    while (i < withoutSoftBreaks.length) {
      if (
        withoutSoftBreaks[i] === "=" &&
        i + 2 < withoutSoftBreaks.length &&
        /^[0-9A-Fa-f]{2}$/.test(withoutSoftBreaks.slice(i + 1, i + 3))
      ) {
        bytes.push(parseInt(withoutSoftBreaks.slice(i + 1, i + 3), 16))
        i += 3
      } else {
        bytes.push(withoutSoftBreaks.charCodeAt(i))
        i++
      }
    }

    const buffer = Buffer.from(bytes)

    if (iconv.encodingExists(charset)) {
      return iconv.decode(buffer, charset)
    }

    return buffer.toString("utf-8")
  } catch {
    return value
  }
}

const decodeBase64 = (value: string, charset: string): string => {
  try {
    // Remove whitespace that may be present in multi-line base64
    const cleanedValue = value.replace(/\s/g, "")

    if (cleanedValue.length === 0) {
      return ""
    }

    const buffer = Buffer.from(cleanedValue, "base64")

    if (buffer.length === 0 && cleanedValue.length > 0) {
      return ""
    }

    if (iconv.encodingExists(charset)) {
      return iconv.decode(buffer, charset)
    }

    return buffer.toString("utf-8")
  } catch {
    return ""
  }
}
