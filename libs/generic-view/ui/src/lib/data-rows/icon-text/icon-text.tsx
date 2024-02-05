/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, IconType } from "generic-view/utils"
import Icon from "../../icon/icon"
import dataTestIds from "./data-test-ids"
import { withData } from "../../utils/with-data"

interface IconTextRowData {
  icon: IconType
  text: string
  subText?: string
}

export const IconText: APIFC<IconTextRowData> = ({ data, ...props }) => {
  if (!data) return null

  const { icon, text, subText } = data

  return (
    <IconTextWrapper {...props}>
      <IconWrapper>
        <Icon data={{ type: icon }} />
      </IconWrapper>
      <TextWrapper>
        <TitleText data-testid={dataTestIds.IconText}>{text}</TitleText>
        {subText && (
          <DetailText data-testid={dataTestIds.IconSubtext}>
            {subText}
          </DetailText>
        )}
      </TextWrapper>
    </IconTextWrapper>
  )
}

export default withData(IconText)

const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  flex: 0;
  min-height: 4.4rem;
  height: 4.4rem;
  align-items: center;
`
const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.grey6};
  min-width: 4rem;
  min-height: 4rem;
  max-width: 4rem;
  max-height: 4rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const TitleText = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.headline4};
  font-weight: 700;
  line-height: ${({ theme }) => theme.lineHeight.headline4};
  letter-spacing: 0.032rem;
  margin: 0;
`
const DetailText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.detailText};
  line-height: ${({ theme }) => theme.lineHeight.detailText};
  letter-spacing: 0.048rem;
  color: ${({ theme }) => theme.color.grey2};
`
