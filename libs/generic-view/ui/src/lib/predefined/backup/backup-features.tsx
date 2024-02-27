/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { ButtonPrimary } from "../../buttons/button-primary"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"

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
      <ModalTitleIcon data={{ type: IconType.Backup }} />
      <h1>Create backup</h1>
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
      <ModalButtons>
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
      </ModalButtons>
    </>
  )
}

const Main = styled.article`
  width: 100%;

  ul {
    margin: 1.4rem 0 0;
    padding-left: 3.1rem;

    li {
      font-size: ${({ theme }) => theme.fontSize.paragraph3};
      line-height: ${({ theme }) => theme.space.xxl};
      letter-spacing: 0.05em;
      padding-left: ${({ theme }) => theme.space.lg};
      color: ${({ theme }) => theme.color.grey1};
      text-align: left;
    }
  }
`
