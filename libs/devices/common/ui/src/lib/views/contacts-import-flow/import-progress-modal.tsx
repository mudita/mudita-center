/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { Button, Modal, ProgressBar, Typography } from "app-theme/ui"
import { defineMessages, formatMessage } from "app-localize/utils"
import { ButtonType, IconType } from "app-theme/models"
import { FormProvider, useForm } from "react-hook-form"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.import.progressModal.title",
  },
  description: {
    id: "apiDevice.contacts.import.progressModal.description",
  },
  transferringLabel: {
    id: "apiDevice.contacts.import.progressModal.transferringLabel",
  },
  refreshingLabel: {
    id: "apiDevice.contacts.import.progressModal.refreshingLabel",
  },
  cancelButton: {
    id: "general.app.cancelButton.text",
  },
})

export enum ImportState {
  Transferring,
  Refreshing,
}

interface Props {
  progress: number
  opened: boolean
  onCancel: VoidFunction
  state: ImportState
}

export const ImportProgressModal: FunctionComponent<Props> = ({
  progress,
  opened,
  onCancel,
  state,
}) => {
  const progressLabel =
    state === ImportState.Transferring
      ? messages.transferringLabel
      : messages.refreshingLabel

  return (
    <Modal opened={opened}>
      <Form>
        <Modal.TitleIcon type={IconType.Download} />
        <Modal.Title message={messages.title.id} />
        <Typography.P1 message={messages.description.id} />
        <ProgressBar value={progress} message={formatMessage(progressLabel)} />
        <Modal.Buttons>
          <Button
            type={ButtonType.Secondary}
            onClick={onCancel}
            message={messages.cancelButton.id}
            disabled={state === ImportState.Refreshing}
          />
        </Modal.Buttons>
      </Form>
    </Modal>
  )
}

interface FormValues {
  selectedContacts: Record<string, boolean>
  searchQuery: string
}

const Form: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      selectedContacts: {},
      searchQuery: "",
    },
  })

  return <FormProvider {...form}>{children}</FormProvider>
}
