/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { IconType } from "generic-view/utils"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { openBackupDirectoryRequest } from "device/feature"
import styled from "styled-components"
import { ButtonText } from "../../buttons/button-text"

const messages = defineMessages({
  title: {
    id: "module.genericViews.backup.success.title",
  },
  description: {
    id: "module.genericViews.backup.success.description",
  },
  openBackupButtonLabel: {
    id: "module.genericViews.backup.success.openBackupButtonLabel",
  },
  closeButtonLabel: {
    id: "module.genericViews.backup.success.closeButtonLabel",
  },
})

export interface Feature {
  label: string
  key: string
}

interface Props {
  onClose: VoidFunction
}

export const BackupSuccess: FunctionComponent<Props> = ({ onClose }) => {
  const openBackupCallback = async () => {
    const openDirectoryResponse = await openBackupDirectoryRequest()
    if (openDirectoryResponse.ok) {
      onClose()
    }
  }
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Success,
        }}
      />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <Article>
        <p>{intl.formatMessage(messages.description)}</p>
        <ButtonText
          config={{
            text: intl.formatMessage(messages.openBackupButtonLabel),
            action: { type: "custom", callback: openBackupCallback },
            modifiers: ["uppercase", "link"],
            icon: IconType.Folder,
          }}
        />
      </Article>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            action: {
              type: "custom",
              callback: onClose,
            },
          }}
        />
      </ModalButtons>
    </>
  )
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;

  button {
    height: 3.2rem;
  }
`
