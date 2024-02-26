/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { RoundIconWithTitle } from "../../shared/shared"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { ButtonPrimary } from "../../buttons/button-primary"

export interface Feature {
  label: string
  key: string
}

interface Props {
  features: Feature[]
  closeAction: ButtonAction
  nextAction: ButtonAction
}

export const BackupFeatures: FunctionComponent<Props> = ({
  features,
  closeAction,
  nextAction,
}) => {
  return (
    <>
      <RoundIconWithTitle icon={IconType.Backup} title={"Create backup"} />
      <Main>
        <p>All backup data stays on your computer.</p>
        <ul>
          <li>Contact list</li>
          <li>Call log</li>
          <li>Messages</li>
          <li>Notes</li>
          <li>Calendar events</li>
          <li>OS version & OS Settings</li>
          <li>App settings: Phone, Messages</li>
        </ul>
      </Main>
      <Buttons>
        <ButtonSecondary
          config={{
            text: "Cancel",
            action: closeAction,
          }}
        />
        <ButtonPrimary
          config={{
            text: "Create backup",
            action: nextAction,
          }}
        />
      </Buttons>
    </>
  )
}

const Main = styled.article`
  width: 100%;

  p {
    color: ${({ theme }) => theme.color.grey1};
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    letter-spacing: 0.02em;
    text-align: center;
    margin: 0 0 2.4rem;
  }

  ul {
    margin: 0;
    padding-left: 3.1rem;

    li {
      font-size: ${({ theme }) => theme.fontSize.paragraph3};
      line-height: 3.2rem;
      letter-spacing: 0.05em;
      padding-left: 1.6rem;
      color: ${({ theme }) => theme.color.grey1};
    }
  }
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2.4rem;

  & > * {
    flex: 1;
  }
`
