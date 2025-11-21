/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Converts the text from one character encoding to another.
 * @param text - The text to be converted.
 * @param fromEncoding - The source character encoding (e.g., 'utf-8').
 * @param toEncoding - The target character encoding (e.g., 'utf-16le').
 * @returns A buffer containing the text in the target encoding.
 */

export const convertTextEncoding = (
  text: string,
  fromEncoding: BufferEncoding,
  toEncoding: BufferEncoding
): Buffer => {
  const sourceBuffer = Buffer.from(text, fromEncoding)
  return Buffer.from(sourceBuffer.toString(fromEncoding), toEncoding)
}
