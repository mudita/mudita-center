/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { Sidebar } from "Renderer/components/core/table/table.component"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { InputError } from "Renderer/components/core/input-text/input-text.elements"
import {
  getTextStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export const TextArea = styled(InputComponent)`
  position: relative;
  display: table;
  border: 0;
  border-radius: 0;
  padding: 0;
  height: calc(100% - 3rem);

  ${InputError} {
    top: auto;
    bottom: 0;
    text-align: right;
  }

  textarea {
    ${getTextStyles(TextDisplayStyle.Paragraph1)};
    margin: 0 !important;
    padding-right: 0 !important;
  }
`

export const Form = styled.form`
  --buttons-bottom-margin: 3.2rem;
  --max-buttons-height: calc(3.2rem + 4rem);
  height: 100%;
`

export const TemplateDetailsWrapper = styled(Sidebar)`
  border-top: none;
`

export const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(13.2rem, 1fr));
  grid-column-gap: 1.6rem;
  width: fit-content;
  margin: 0 0 var(--buttons-bottom-margin) auto;
  max-height: var(--max-buttons-height);

  button {
    width: auto;
  }
`
export const Content = styled.div`
  flex: 1;
  min-height: 28rem;
  height: calc(100% - var(--max-buttons-height));
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    width: calc(50% - 3.2rem);
  }
`
