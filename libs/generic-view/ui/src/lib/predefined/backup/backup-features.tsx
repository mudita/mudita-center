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
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.backup.features.title",
  },
  description: {
    id: "module.genericViews.backup.features.description",
  },
  cancelButtonLabel: {
    id: "module.genericViews.backup.features.cancelButtonLabel",
  },
  createButtonLabel: {
    id: "module.genericViews.backup.features.createButtonLabel",
  },
})

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
      <h1>{intl.formatMessage(messages.title)}</h1>
      <Main>
        <p>{intl.formatMessage(messages.description)}</p>
        <ul>
          {features.map((feature) => (
            <li key={feature.key}>{feature.label}</li>
          ))}
        </ul>
      </Main>
      <ModalButtons>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.cancelButtonLabel),
            action: closeAction,
          }}
        />
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.createButtonLabel),
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
