/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { ButtonPrimary } from "../../buttons/button-primary"
import { Modal } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { BackupFeature } from "generic-view/models"

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

interface Props {
  features: BackupFeature[]
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
      <Modal.TitleIcon data={{ type: IconType.Backup }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Article>
        <p>{intl.formatMessage(messages.description)}</p>
        <Modal.ScrollableContent>
          <ul>
            {features.map((feature, index) => (
              <li key={feature.key + index}>{feature.label}</li>
            ))}
          </ul>
        </Modal.ScrollableContent>
      </Article>
      <Modal.Buttons>
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
      </Modal.Buttons>
    </>
  )
}

const Article = styled.article`
  p {
    padding-bottom: 1.4rem;
  }
`
