/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { ButtonAction, IconType } from "generic-view/utils"
import {
  ModalButtons,
  ModalScrollableContent,
  ModalTitleIcon,
} from "../../interactive/modal"
import { useSelector } from "react-redux"
import { selectDeviceBackups } from "generic-view/store"
import styled from "styled-components"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { ButtonPrimary } from "../../buttons/button-primary"
import { RadioInput } from "../../interactive/input/radio-input"
import { useFormContext } from "react-hook-form"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.restore.select.title",
  },
  singleDescription: {
    id: "module.genericViews.restore.select.single.description",
  },
  multipleDescription: {
    id: "module.genericViews.restore.select.multiple.description",
  },
  cancelButtonLabel: {
    id: "module.genericViews.restore.select.cancelButtonLabel",
  },
  restoreButtonLabel: {
    id: "module.genericViews.restore.select.restoreButtonLabel",
  },
})

interface Props {
  closeAction: ButtonAction
  nextAction: ButtonAction
}

export const BackupRestoreSelect: FunctionComponent<Props> = ({
  closeAction,
  nextAction,
}) => {
  const backups = useSelector(selectDeviceBackups)
  const { formState, register, clearErrors } = useFormContext()

  useEffect(() => {
    if (backups.length === 1) {
      register("file", { value: backups[0].fileName })
      clearErrors("file")
    }
  }, [backups, clearErrors, register])

  return (
    <>
      <ModalTitleIcon data={{ type: IconType.Backup }} />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <Article>
        {backups.length === 1 ? (
          <>
            <p>{intl.formatMessage(messages.singleDescription)}</p>
            <ul>
              <li>{formatDate(backups[0].date)}</li>
            </ul>
          </>
        ) : (
          <>
            <p>{intl.formatMessage(messages.multipleDescription)}</p>
            <ModalScrollableContent>
              {backups.map((backup) => (
                <RadioInput
                  key={backup.fileName}
                  config={{
                    label: formatDate(backup.date),
                    name: "file",
                    value: backup.fileName,
                    validation: {
                      required: true,
                    },
                  }}
                />
              ))}
            </ModalScrollableContent>
          </>
        )}
      </Article>
      <ModalButtons>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.cancelButtonLabel),
            action: closeAction,
          }}
        />
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.restoreButtonLabel),
            action: nextAction,
            disabled: !formState.isValid,
          }}
        />
      </ModalButtons>
    </>
  )
}

const formatDate = (date: Date) => {
  return date
    .toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    })
    .toLowerCase()
}

const Article = styled.article`
  p {
    padding-bottom: 1.4rem;
  }
`
