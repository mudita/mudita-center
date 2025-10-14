/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FormEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useCallback,
  useRef,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { Typography } from "app-theme/ui"
import { formatMessage, Messages } from "app-localize/utils"
import { backgroundColor, borderColor, textColor } from "app-theme/utils"
import { glyphs, GlyphsType } from "./glyphs"

export interface CreateFormInputProps {
  label?: string
  rows?: number
  limits: number[]
  glyphsType: GlyphsType
  onChange: (value: string) => void
  onError: (hasError: boolean) => void
  messages: {
    errorTooLong: Messages
    errorInvalidCharacter: Messages
  }
}

export const CreateFormInput: FunctionComponent<CreateFormInputProps> = ({
  label,
  rows = 1,
  glyphsType,
  limits,
  onChange,
  onError,
  messages,
}) => {
  const [error, setError] = useState("")
  const [linesCount, setLinesCount] = useState(1)

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const validateText = useCallback(
    (value: string, limit: number) => {
      let sum = 0
      let invalidCharacter = ""

      for (const char of value.split("")) {
        const charCode = String(char.charCodeAt(0))

        if (!glyphs[charCode]) {
          invalidCharacter = char
          break
        }

        sum += glyphs[charCode][glyphsType] || 0
      }

      return {
        fits: sum <= limit,
        invalidCharacter,
      }
    },
    [glyphsType]
  )

  const handleInput: FormEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const value = (event.target as HTMLTextAreaElement).value
      const lines = value.split("\n")
      setLinesCount(lines.length)

      const linesValid = Array.from({ length: lines.length }).fill({
        fits: true,
        invalidCharacter: "",
      }) as { fits: boolean; invalidCharacter: string }[]

      for (const [index, limit] of limits.entries()) {
        linesValid[index] = validateText(lines[index] || "", limit)
      }

      const tooManyLines = lines.length > rows
      const tooLongLines = linesValid.some(({ fits }) => !fits)
      const invalidCharacters = linesValid
        .map(({ invalidCharacter }) => invalidCharacter)
        .filter(Boolean)
      const hasInvalidCharacter = invalidCharacters.length > 0

      if (tooManyLines || tooLongLines) {
        onChange("")
        onError(true)
        setError(formatMessage(messages.errorTooLong))
      } else if (hasInvalidCharacter) {
        onChange("")
        onError(true)
        setError(
          formatMessage(messages.errorInvalidCharacter, {
            character: invalidCharacters[0],
          })
        )
      } else {
        onChange(value)
        onError(false)
        setError("")
      }
    },
    [limits, onChange, onError, rows, validateText]
  )

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      if (event.key === "Enter" && linesCount >= rows) {
        event.preventDefault()
      }
    },
    [linesCount, rows]
  )

  return (
    <Wrapper>
      <Label color={"black"}>{label}</Label>
      <Textarea
        rows={rows}
        $hasError={Boolean(error)}
        ref={inputRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <Error>{error}</Error>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Label = styled(Typography.H5)`
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  min-width: 14.4rem;
  padding: 0 0.6rem;
  box-sizing: border-box;
  background-color: ${backgroundColor("row")};
  text-align: center;
`

const Textarea = styled.textarea<{ $hasError: boolean }>`
  resize: none;
  outline: none;
  padding: 2rem;
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-weight: 700;
  text-align: center;
  border: solid 0.1rem ${borderColor("secondary")};
  border-radius: 1.2rem;

  ${({ $hasError }) =>
    $hasError
      ? css`
          border-color: ${borderColor("error")};
        `
      : css`
          &:focus {
            border-color: ${borderColor("primary")};
          }
        `}
`

const Error = styled(Typography.H5)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${textColor("error")};
  min-height: 3rem;
`
