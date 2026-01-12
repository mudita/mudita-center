/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { useSelector } from "react-redux"
import {
  ContactSupportFieldValues,
  ContactSupportFlow,
} from "contact-support/ui"
import { AppResultFactory, OpenDialogOptionsLite } from "app-utils/models"
import { AppActions } from "app-utils/renderer"
import { useAppDispatch } from "app-store/utils"
import { selectContactSupportModalVisible } from "./store/contact-support.selectors"
import { useCreateTicket } from "./use-contact-support"
import { setContactSupportModalVisible } from "./store/contact-support.actions"
import { usePrepareLogsArchiveHook } from "./hook/use-prepare-logs-archive.hook"

export const ContactSupport: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const modalVisible = useSelector(selectContactSupportModalVisible)
  const { mutateAsync: createTicketMutateAsync, reset: createTicketReset } =
    useCreateTicket()
  const prepareLogs = usePrepareLogsArchiveHook()

  const createTicket = useCallback(
    async (data: ContactSupportFieldValues & { logsZipScopePath?: string }) => {
      try {
        await createTicketMutateAsync(data)
        return AppResultFactory.success()
      } catch {
        return AppResultFactory.failed()
      }
    },
    [createTicketMutateAsync]
  )

  const hideModalVisible = useCallback(() => {
    dispatch(setContactSupportModalVisible(false))
    createTicketReset()
  }, [dispatch, createTicketReset])

  const openDirectoryDialog = async (
    options: OpenDialogOptionsLite
  ): Promise<string | null> => {
    const directories = await AppActions.openFileDialog(options)
    return directories[0] ?? null
  }

  return (
    <ContactSupportFlow
      onClose={hideModalVisible}
      opened={modalVisible}
      createTicket={createTicket}
      prepareLogs={prepareLogs}
      openDirectoryDialog={openDirectoryDialog}
    />
  )
}
