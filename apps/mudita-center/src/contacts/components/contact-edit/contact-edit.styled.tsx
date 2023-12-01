/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { ListItem } from "App/__deprecated__/renderer/components/core/list/list.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"
import { InputComponentProps } from "App/__deprecated__/renderer/components/core/input-text/input-text.interface"
import { fontWeight } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { Sidebar } from "App/__deprecated__/renderer/components/core/table/table.component"

export const Form = styled.form`
  --buttons-bottom-margin: 3.2rem;
  --max-buttons-height: calc(3.2rem + 4rem);
  height: 100%;
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

  select {
    height: 1.8rem;
    margin-top: 3.8rem;
    margin-bottom: 0.7rem;
  }
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
export const Input = styled(InputComponent)<InputComponentProps>`
  margin-top: 1.8rem;

  input {
    font-weight: ${fontWeight("default")};
  }
`
export const SpeedDialListItem = styled(ListItem)<{
  inactive?: boolean
}>`
  ${({ inactive }) =>
    inactive &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`
export const SpeedDialSettings = styled(ButtonComponent)`
  padding: 0.9rem;
  height: auto;
  width: auto;
`
export const SpeedDial = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1.8rem;

  label {
    width: 8.5rem;
  }
`
export const speedDialListStyles = css`
  li {
    padding-left: 0.8rem;
  }
`
export const ContactDetailsWrapper = styled(Sidebar)`
  border-top: none;
`

export const CustomCheckbox = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3.3rem;
  padding-bottom: 1.4rem;
  cursor: pointer;

  p {
    margin: 0 0.8rem 0 1.2rem;
    text-transform: initial;
  }
`
