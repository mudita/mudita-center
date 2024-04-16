/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const mapToString = (
  result: string | ArrayBuffer | null | undefined
): string => {
  return typeof result === "string" ? result : ""
}

const mapFileToString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => resolve(mapToString(event.target?.result))
    reader.onerror = (event) => reject(event.target?.error)
    reader.readAsText(file)
  })
}

export default mapFileToString
