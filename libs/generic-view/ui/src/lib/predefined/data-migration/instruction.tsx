/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { P1, P3 } from "../../texts/paragraphs"
import * as ConnectionSvg from "./connection.svg"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.instruction.title",
  },
  description: {
    id: "module.genericViews.dataMigration.instruction.description",
  },
  step: {
    id: "module.genericViews.dataMigration.instruction.step",
  },
  step1: {
    id: "module.genericViews.dataMigration.instruction.step1",
  },
  step2: {
    id: "module.genericViews.dataMigration.instruction.step2",
  },
  step3: {
    id: "module.genericViews.dataMigration.instruction.step3",
  },
})

export const Instruction: FunctionComponent = () => {
  return (
    <InstructionWrapper>
      <Header>
        <h2>{intl.formatMessage(messages.title)}</h2>
        <P3>{intl.formatMessage(messages.description)}</P3>
      </Header>
      <Image>
        <ConnectionSvg />
      </Image>
      <Steps>
        <Step>
          <P1>{intl.formatMessage(messages.step, { number: 1 })}</P1>
          <P3>{intl.formatMessage(messages.step1)}</P3>
        </Step>
        <Step>
          <P1>{intl.formatMessage(messages.step, { number: 2 })}</P1>
          <P3>{intl.formatMessage(messages.step2)}</P3>
        </Step>
        <Step>
          <P1>{intl.formatMessage(messages.step, { number: 3 })}</P1>
          <P3>{intl.formatMessage(messages.step3)}</P3>
        </Step>
      </Steps>
    </InstructionWrapper>
  )
}

export const InstructionWrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: 14.4rem 1fr auto;
  justify-content: center;
  justify-items: center;
  align-self: center;
  width: 100%;
  max-width: 73.2rem;
  padding: 4.4rem 0 5.1rem 0;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40.6rem;
  gap: 1.4rem;

  h2 {
    font-size: 1.8rem;
    line-height: 2.4rem;
    margin: 0;
    text-align: center;
  }

  p {
    text-align: center;
  }
`

const Image = styled.div`
  height: auto;

  svg {
    width: auto;
    height: 100%;
  }
`

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 22.8rem);
  justify-content: space-between;
  width: 100%;
  margin-top: 2.4rem;
  gap: ${({ theme }) => theme.space.xl};
`

const Step = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};

  p {
    color: ${({ theme }) => theme.color.grey1};
    text-align: center;

    &:first-of-type {
      color: ${({ theme }) => theme.color.grey3};
    }
  }
`
