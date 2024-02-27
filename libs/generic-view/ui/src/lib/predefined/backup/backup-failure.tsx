/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { IconType } from "generic-view/utils"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"

export const BackupFailure: FunctionComponent<{ modalKey: string }> = ({
  modalKey,
}) => {
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Failure,
        }}
      />
      <h1>Backup failed</h1>
      <p>The backup process was interrupted.</p>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: "Close",
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
