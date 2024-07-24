/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { uniq } from "lodash"

interface HighlightTextProps {
  text: string
  phrase: string
}

export const HighlightText: FunctionComponent<HighlightTextProps> = ({
  text,
  phrase,
}) => {
  const phrases = uniq(phrase.toLowerCase().split(" "))
  const phrasesRegex = phrases.map((phrase) => phrase).join("|")
  const splitRegex = new RegExp(`(${phrasesRegex})`, "gi")
  const parts = text.split(splitRegex)

  return (
    <>
      {parts.map((part, index) => {
        return phrases.includes(part.toLowerCase()) ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        )
      })}
    </>
  )
}
