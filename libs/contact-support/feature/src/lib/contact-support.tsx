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
import { AppResultFactory } from "app-utils/models"
import { useAppDispatch } from "app-store/utils"
import { selectContactSupportModalVisible } from "./store/contact-support.selectors"
import { useCreateTicket } from "./use-contact-support"
import { setContactSupportModalVisible } from "./store/contact-support.actions"

export const ContactSupport: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const modalVisible = useSelector(selectContactSupportModalVisible)
  const { mutateAsync: createTicketMutateAsync, reset: createTicketReset } =
    useCreateTicket()

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

  const hideModalVisible = useCallback(() => {
    dispatch(setContactSupportModalVisible(false))
    createTicketReset()
  }, [dispatch, createTicketReset])

  return (
    <ContactSupportFlow
      onClose={hideModalVisible}
      opened={modalVisible}
      createTicket={createTicket}
    />
  )
}
