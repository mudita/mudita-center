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
import { BackupModalTestIds } from "e2e-test-ids"

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

const comingSoonMessages = defineMessages({
  messages: {
    id: "module.genericViews.backup.features.comingSoon.messages",
  },
  notes: {
    id: "module.genericViews.backup.features.comingSoon.notes",
  },
  calendar: {
    id: "module.genericViews.backup.features.comingSoon.calendar",
  },
  apps: {
    id: "module.genericViews.backup.features.comingSoon.apps",
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
      <Modal.TitleIcon config={{ type: IconType.Backup }} />
      <Modal.Title data-testid={BackupModalTestIds.Title}>
        {intl.formatMessage(messages.title)}
      </Modal.Title>
      <Article>
        <p data-testid={BackupModalTestIds.Description}>
          {intl.formatMessage(messages.description)}
        </p>
        <Modal.ScrollableContent>
          <ul>
            {features.map((feature, index) => (
              <li
                key={feature.key + index}
                data-testid={BackupModalTestIds.FeatureElementActive}
              >
                {feature.label}
              </li>
            ))}
            {Object.entries(comingSoonMessages).map(([key, message], index) => {
              return (
                <ComingSoonListItem
                  key={key + index}
                  data-testid={BackupModalTestIds.FeatureElementInactive}
                >
                  {intl.formatMessage(message)}
                </ComingSoonListItem>
              )
            })}
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
const ComingSoonListItem = styled.li`
  && {
    color: #bfbfbf;
  }
  &&::marker {
    content: url('data:image/svg+xml,<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle fill="%23BFBFBF" r="3.5" cx="5" cy="4"/></svg>');
  }
`
