/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { AppResultFactory } from "app-utils/models"
import { CrashDumpsData, Harmony } from "devices/harmony/models"
import { IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"
import { useOpenDirectoryDialogHook } from "app-utils/renderer"
import {
  ContactSupportFieldValues,
  ContactSupportFlow,
} from "contact-support/ui"
import {
  updateIgnoredCrashDumps,
  useNewCrashDumpsQuery,
} from "devices/harmony/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import {
  useCreateTicket,
  usePrepareLogsArchiveHook,
} from "contact-support/feature"

const harmonyCrashDumpsMessages = defineMessages({
  formModalTitle: {
    id: "general.crashDumps.formModal.title",
  },
  formModalDescription: {
    id: "general.crashDumps.formModal.description",
  },
})

export const HarmonyCrashDumpsFlow: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const { data: activeDevice } = useActiveDeviceQuery<Harmony>()

  const crashDumpsData = queryClient.getQueryData<CrashDumpsData>(
    useNewCrashDumpsQuery.queryKey(activeDevice?.path)
  )
  const { mutateAsync: createTicketMutateAsync, reset: createTicketReset } =
    useCreateTicket()

  const prepareLogs = usePrepareLogsArchiveHook()
  const openDirectoryDialog = useOpenDirectoryDialogHook()

  const [crashDumpsFlowOpened, setCrashDumpsFlowOpened] = useState<boolean>()

  useEffect(() => {
    if (
      crashDumpsFlowOpened === undefined &&
      !!crashDumpsData?.newCrashDumpExists
    ) {
      setCrashDumpsFlowOpened(true)
    }
  }, [crashDumpsData, crashDumpsFlowOpened])

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

  const onClose = useCallback(() => {
    setCrashDumpsFlowOpened(false)
    createTicketReset()
    crashDumpsData &&
      updateIgnoredCrashDumps(crashDumpsData.crashDumps, activeDevice)
  }, [createTicketReset, crashDumpsData, activeDevice])

  return (
    <ContactSupportFlow
      onClose={onClose}
      opened={!!crashDumpsFlowOpened}
      createTicket={createTicket}
      formIcon={IconType.Failed}
      messages={harmonyCrashDumpsMessages}
      prepareLogs={prepareLogs}
      openDirectoryDialog={openDirectoryDialog}
    />
  )
}
