/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text, {
  getTextStyles,
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  borderColor,
  fontWeight,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { Sidebar } from "App/__deprecated__/renderer/components/core/table/table.component"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"
import { InputComponentProps } from "App/__deprecated__/renderer/components/core/input-text/input-text.interface"
import { generalInputStyles } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"

export const BasicInfo = styled.div`
  margin: 2.8rem auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`
export const Name = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Headline3,
}))`
  grid-area: Name;
  text-align: center;
  line-height: 1.2;
  height: 5.6rem;
  width: 100%;
  margin-bottom: 1.4rem;
`
export const InfoItem = styled.div`
  display: grid;
  grid-row-gap: 1.2rem;
  grid-template-rows: 1.8rem 1.2rem;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  justify-items: center;
  align-items: center;
  margin: 0 2.4rem;
`

export const InfoItemSpeedDialNumber = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Headline3,
}))`
  font-size: 2.2rem;
  line-height: 1;
  font-weight: ${fontWeight("default")};
`
export const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7.6rem;
  justify-content: space-between;

  > div {
    width: calc(50% - 3.2rem);
  }
`
export const AdditionalInfoItem = styled.div`
  width: 100%;
  margin-bottom: 4.2rem;
`
export const Input = styled(InputComponent).attrs<{ label: string }>(
  ({ value, defaultValue, label }) => ({
    label: value || defaultValue ? undefined : label,
    readOnly: true,
  })
)<InputComponentProps>`
  padding: 2.4rem 0 0.6rem 0;

  div {
    transition: all 0s;
    input {
      line-height: 2.4rem;
    }
  }
`
export const ContactDetailsWrapper = styled(Sidebar)`
  border-top: none;
`

export const ContactDetailsInfo = styled(Text)`
  ${generalInputStyles};
  padding: 2.4rem 0 0.6rem 0;
  white-space: pre-wrap;
  margin: 0;
  border-bottom: 0.1rem solid ${borderColor("secondary")};
  line-height: 1.8;
`

export const ContactDetailsLabel = styled(Text)`
  color: ${textColor("secondary")};
  ${getTextStyles(TextDisplayStyle.Paragraph3)};
  margin: 0;
  padding: 2.4rem 0 1.6rem 0;
  border-bottom: 0.1rem solid ${borderColor("secondary")};
`
