/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useState } from "react"
import { format } from "date-fns"
import {
  AppFileSystemGuardOptions,
  AppResult,
  OpenDialogOptionsLite,
} from "app-utils/models"
import { delayUntil } from "app-utils/common"
import { ContactSupportErrorModal } from "./contact-support-error-modal"
import {
  ContactSupportFieldValues,
  ContactSupportFormModal,
  ContactSupportModalProps,
} from "./contact-support-form-modal"
import { ContactSupportSendingModal } from "./contact-support-sending-modal"
import { ContactSupportSuccessModal } from "./contact-support-success-modal"
import { ContactSupportDownloadingLogsModal } from "./contact-support-downloading-logs-modal"

type ContactSupportFlowMessages = ContactSupportModalProps["messages"]

export interface ContactSupportFlowProps {
  opened: boolean
  onClose: VoidFunction
  messages?: ContactSupportFlowMessages
  createTicket: (
    data: ContactSupportFieldValues & { logsZipScopePath?: string }
  ) => Promise<AppResult>
  prepareLogs: (
    scopeDestinationPath: AppFileSystemGuardOptions
  ) => Promise<string | null>
  openDirectoryDialog: (
    options: OpenDialogOptionsLite
  ) => Promise<string | null>
  formIcon?: ContactSupportModalProps["formIcon"]
}

enum ContactSupportFlowState {
  Idle,
  Form,
  Sending,
  Success,
  Error,
}

const todayFormatDate = format(new Date(), "dd-MM-yy")
const zippedLogsFileName = `${todayFormatDate} Mudita Center.zip`

export const ContactSupportFlow: FunctionComponent<ContactSupportFlowProps> = ({
  opened,
  onClose,
  messages,
  createTicket,
  prepareLogs,
  openDirectoryDialog,
  formIcon,
}) => {
  const [previousOpened, setPreviousOpened] = useState(opened)
  const [flowState, setFlowState] = useState<ContactSupportFlowState>()
  const [downloadingLogs, setDownloadingLogs] = useState(false)
  const [logsZipScopePath, setLogsZipScopePath] = useState<string | undefined>(
    undefined
  )

  if (previousOpened !== opened) {
    setPreviousOpened(opened)
    setFlowState(opened ? ContactSupportFlowState.Form : undefined)
  }

  const onSubmit = useCallback(
    async (data: ContactSupportFieldValues) => {
      setFlowState(ContactSupportFlowState.Sending)
      const result = await createTicket({
        ...data,
        logsZipScopePath,
      })
      if (result.ok) {
        setFlowState(ContactSupportFlowState.Success)
      } else {
        setFlowState(ContactSupportFlowState.Error)
      }
    },
    [createTicket, logsZipScopePath]
  )

  const onFileButtonClick = useCallback(async () => {
    const fileAbsolutePath = await openDirectoryDialog({
      properties: ["openDirectory"],
    })

    if (!fileAbsolutePath) {
      return
    }

    setDownloadingLogs(true)

    const logsZipScopePath = await delayUntil(
      prepareLogs({
        fileAbsolutePath,
        absolute: true,
      }),
      500
    )
    if (logsZipScopePath) {
      setLogsZipScopePath(logsZipScopePath)
    }
    setDownloadingLogs(false)
  }, [prepareLogs, openDirectoryDialog])

  return (
    <>
      <ContactSupportFormModal
        opened={flowState === ContactSupportFlowState.Form}
        files={[{ name: zippedLogsFileName }]}
        onSubmit={onSubmit}
        onClose={onClose}
        onFileButtonClick={onFileButtonClick}
        messages={messages}
        formIcon={formIcon}
      />
      <ContactSupportDownloadingLogsModal opened={downloadingLogs} />
      <ContactSupportSendingModal
        opened={flowState === ContactSupportFlowState.Sending}
      />
      <ContactSupportSuccessModal
        opened={flowState === ContactSupportFlowState.Success}
        onClose={onClose}
      />
      <ContactSupportErrorModal
        opened={flowState === ContactSupportFlowState.Error}
        onClose={onClose}
      />
    </>
  )
}
