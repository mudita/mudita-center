/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  FreshdeskTicketDataType,
  FreshdeskTicketProduct,
} from "contact-support/models"
import { delayUntilAtLeast } from "app-utils/common"
import { ContactSupportFieldValues } from "contact-support/ui"
import { getActiveDevice } from "devices/common/feature"
import { contactSupportMutationKeys } from "./contact-support-mutation-keys"
import { createTicket } from "./actions/create-ticket"

export const useCreateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [contactSupportMutationKeys.createTicket],
    mutationFn: (
      data: ContactSupportFieldValues & { logsZipScopePath?: string }
    ) => {
      const activeDevice = getActiveDevice(queryClient)
      const email = data.email
      const description = (data.description || "no text").replace(
        /\r\n|\r|\n/g,
        "<br/>"
      )
      const deviceId = activeDevice?.path || "unknown_device"
      const serialNumber = activeDevice?.serialNumber || "unknown_serial"
      const actionPayload = {
        email,
        description,
        serialNumber,
        deviceId,
        subject: `Error`,
        type: FreshdeskTicketDataType.Problem,
        product: FreshdeskTicketProduct.None,
      }

      return delayUntilAtLeast(
        () =>
          createTicket(
            actionPayload,
            data.logsZipScopePath,
            activeDevice ?? undefined
          ),
        500
      )
    },
  })
}
