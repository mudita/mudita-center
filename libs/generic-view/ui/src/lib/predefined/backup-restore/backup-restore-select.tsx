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
      <h1>Restore from backup</h1>
      <Article>
        {backups.length === 1 ? (
          <>
            <p>
              You have one backup available. Would you like to restore it now?
            </p>
            <ul>
              <li>{formatDate(backups[0].date)}</li>
            </ul>
          </>
        ) : (
          <>
            <p>Select one of the backups you want to restore.</p>
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
        <ButtonSecondary config={{ text: "Cancel", action: closeAction }} />
        <ButtonPrimary
          config={{
            text: "Restore from backup",
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
