/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { ButtonAction, IconType } from "generic-view/utils"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { cleanRestoreProcess } from "generic-view/store"

const messages = defineMessages({
  title: {
    id: "module.genericViews.restore.failure.title",
  },
  defaultErrorMessage: {
    id: "module.genericViews.restore.failure.defaultErrorMessage",
  },
  closeButtonLabel: {
    id: "module.genericViews.restore.failure.closeButtonLabel",
  },
})

interface Props {
  closeAction: ButtonAction
}

export const BackupRestoreError: FunctionComponent<Props> = ({
  closeAction,
}) => {
  // const dispatch = useDispatch<Dispatch>()

  // useEffect(() => {
  //   return () => {
  //     dispatch(cleanRestoreProcess())
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Failure,
        }}
      />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <p>{intl.formatMessage(messages.defaultErrorMessage)}</p>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            action: closeAction,
          }}
        />
      </ModalButtons>
    </>
  )
}
