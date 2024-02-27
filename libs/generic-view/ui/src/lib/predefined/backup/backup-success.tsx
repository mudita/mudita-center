/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { IconType } from "generic-view/utils"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"

export interface Feature {
  label: string
  key: string
}

interface Props {}

export const BackupSuccess: FunctionComponent<Props> = () => {
  const openBackupDirectory = () => {}
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Success,
        }}
      />
      <h1>Backup complete</h1>
      <p>Your data has been successfully secured.</p>
      <p>
        Open the backup folder to see your backup data or close this window.
      </p>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: "Open backup",
            action: {
              type: "custom",
              callback: openBackupDirectory,
            },
          }}
        />
      </ModalButtons>
    </>
  )
}
