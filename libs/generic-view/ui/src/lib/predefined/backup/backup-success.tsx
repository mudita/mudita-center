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
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { openBackupDirectoryRequest } from "device/feature"
import { closeModal } from "generic-view/store"
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
  modalKey: string
}

export const BackupSuccess: FunctionComponent<Props> = ({ modalKey }) => {
  const dispatch = useDispatch<Dispatch>()

  const openBackupCallback = async () => {
    const openDirectoryResponse = await openBackupDirectoryRequest()
    if (openDirectoryResponse.ok) {
      dispatch(closeModal({ key: modalKey! }))
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
      <Main>
        <p>{intl.formatMessage(messages.description)}</p>
        <ButtonText
          config={{
            text: intl.formatMessage(messages.openBackupButtonLabel),
            action: { type: "custom", callback: openBackupCallback },
            modifiers: ["uppercase", "link"],
            icon: IconType.Folder,
          }}
        />
      </Main>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            // Will be changed after merging with CP-2496-backup-error
            action: {
              type: "close-modal",
              modalKey,
            },
          }}
        />
      </ModalButtons>
    </>
  )
}

const Main = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;

  button {
    height: 3.2rem;
  }
`
