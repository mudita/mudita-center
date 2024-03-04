/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { ButtonPrimary } from "../../buttons/button-primary"
import {
  ModalButtons,
  ModalScrollableContent,
  ModalTitleIcon,
} from "../../interactive/modal"
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
        <ModalScrollableContent>
          <ul>
            {features.map((feature, index) => (
              <li key={feature.key + index}>{feature.label}</li>
            ))}
          </ul>
        </ModalScrollableContent>
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

  & > p {
    padding-bottom: 1.4rem;
  }
`
