/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, IconType, withData } from "generic-view/utils"
import Icon from "../icon/icon"

interface IconTextRowData {
  icon: string
  title: string
  text: string
}

export const IconText: APIFC<IconTextRowData> = ({ data, ...props }) => {
  const { icon, title, text } = {
    icon: "battery-1",
    title: "15 %",
    text: "Battery",
  } // data || {}

  return (
    <IconTextWrapper {...props}>
      <IconWrapper>
        <Icon data={{ type: IconType.Battery }} />
      </IconWrapper>
      <TextWrapper>
        <TitleText>{title}</TitleText>
        <DetailText>{text}</DetailText>
      </TextWrapper>
    </IconTextWrapper>
  )
}

export default withData(IconText)

const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex: 0;
`
const IconWrapper = styled.div`
  background-color: #fbfbfb;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
`

const TitleText = styled.h4`
  font-family: GT Pressura;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 0;
  letter-spacing: 0.32px;
  margin: 12px 0 0 0;
`
const DetailText = styled.span`
  font-family: GT Pressura;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.48px;
  color: #6a6a6a;
`
