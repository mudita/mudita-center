/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { H4, H5 } from "../../../texts/headers"
import { P3 } from "../../../texts/paragraphs"
import { ButtonPrimary } from "../../../buttons/button-primary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  label: {
    id: "module.genericViews.dataMigration.targetSelector.deviceCard.label",
  },
  serialNumber: {
    id: "module.genericViews.dataMigration.targetSelector.deviceCard.serialNumber",
  },
  selectButton: {
    id: "module.genericViews.dataMigration.targetSelector.deviceCard.selectButton",
  },
})

export interface Device {
  name: string
  image: string
  serialNumber: string
}

export const DeviceCard: FunctionComponent<
  Device & { onSelect: VoidFunction }
> = ({ image, name, serialNumber, onSelect }) => {
  return (
    <Wrapper>
      <Tag>{intl.formatMessage(messages.label)}</Tag>
      <Image>
        <img src={image} alt={name} />
      </Image>
      <Info>
        <H4>{name}</H4>
        <P3>{intl.formatMessage(messages.serialNumber)}</P3>
        <H5>{serialNumber}</H5>
      </Info>
      <SelectButton
        config={{
          text: intl.formatMessage(messages.selectButton),
          actions: [{ type: "custom", callback: onSelect }],
        }}
      />
    </Wrapper>
  )
}

export const deviceCardStyles = css`
  overflow: hidden;
  border: solid 0.2rem ${({ theme }) => theme.color.grey5};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.color.white};
`

const Wrapper = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-rows: 4.8rem 12rem 10.4rem;
  grid-template-columns: 2.9rem 11.2rem 11.2rem 2.9rem;
  grid-template-areas:
    ". tag tag tag"
    ". image info ."
    ". button button .";

  ${deviceCardStyles};
`

export const Tag = styled.div`
  grid-area: tag;
  background-color: ${({ theme }) => theme.color.green};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: end;
  align-self: start;
  padding: 0.1rem 0.4rem;
  margin-top: -0.2rem;

  font-size: ${({ theme }) => theme.fontSize.labelText};
  line-height: 2.2rem;
  letter-spacing: 0.04em;
  border-radius: ${({ theme }) => theme.radius.sm};
`

export const Image = styled.div`
  grid-area: image;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const Info = styled.div`
  grid-area: info;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${({ theme }) => theme.space.sm};

  ${H4} {
    margin-bottom: 0.2rem;
  }
`

const SelectButton = styled(ButtonPrimary)`
  grid-area: button;
  margin-top: ${({ theme }) => theme.space.xxl};
`
