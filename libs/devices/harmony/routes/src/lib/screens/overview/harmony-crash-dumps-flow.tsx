/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { AppResultFactory } from "app-utils/models"
import { Harmony } from "devices/harmony/models"
import { IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"
import {
  ContactSupportFieldValues,
  ContactSupportFlow,
} from "contact-support/ui"
import { useDetectNewCrashDumpsQuery } from "devices/harmony/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { useCreateTicket } from "contact-support/feature"

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

  const crashDumpExists: boolean | undefined = queryClient.getQueryData(
    useDetectNewCrashDumpsQuery.queryKey(activeDevice?.path)
  )
  const { mutateAsync: createTicketMutateAsync, reset: createTicketReset } =
    useCreateTicket()

  const [crashDumpsFlowOpened, setCrashDumpsFlowOpened] = useState<boolean>()

  useEffect(() => {
    if (crashDumpsFlowOpened === undefined && !!crashDumpExists) {
      setCrashDumpsFlowOpened(true)
    }
  }, [crashDumpExists, crashDumpsFlowOpened])

  const createTicket = useCallback(
    async (data: ContactSupportFieldValues) => {
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
  }, [createTicketReset])

  return (
    <ContactSupportFlow
      onClose={onClose}
      opened={!!crashDumpsFlowOpened}
      createTicket={createTicket}
      formIcon={IconType.Failed}
      messages={harmonyCrashDumpsMessages}
    />
  )
}
