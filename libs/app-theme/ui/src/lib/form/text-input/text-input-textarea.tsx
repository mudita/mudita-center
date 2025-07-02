/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { styled } from "styled-components"
import { FunctionComponent, Ref, TextareaHTMLAttributes } from "react"
import { Input, Placeholder } from "./text-input-shared"

export const Textarea = styled(Input).attrs({ as: "textarea" })`
  line-height: 1.8rem;
  resize: none;
  overflow-y: scroll;
  overflow-x: hidden;
`

export interface TextInputTextareaInnerProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  placeholder?: string
  ref?: Ref<HTMLTextAreaElement>
}

export const TextInputTextarea: FunctionComponent<
  TextInputTextareaInnerProps
> = ({ id, placeholder, rows = 1, ...rest }) => {
  const labelId = `${id}-label`

  return (
    <>
      <Textarea
        {...rest}
        id={id}
        aria-labelledby={labelId}
        placeholder={""}
        rows={rows}
      />
      <Placeholder>
        <span id={labelId}>{placeholder}</span>
      </Placeholder>
    </>
  )
}
