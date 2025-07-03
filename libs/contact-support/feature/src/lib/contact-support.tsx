/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { useSelector } from "react-redux"
import { format } from "date-fns"
import {
  ContactSupportErrorModal,
  ContactSupportFieldValues,
  ContactSupportFormModal,
  ContactSupportSendingModal,
  ContactSupportSuccessModal,
} from "contact-support/ui"
import { useAppDispatch } from "app-store/utils"
import { selectCreateTicketModalVisible } from "./store/contact-support.selectors"
import { useCreateTicket } from "./use-contact-support"
import { setCreateTicketModalVisible } from "./store/contact-support.actions"

const todayFormatDate = format(new Date(), "dd-MM-yy")
const zippedLogsFileName = `${todayFormatDate} Mudita Center.zip`

export const ContactSupport: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const createTicketModalVisible = useSelector(selectCreateTicketModalVisible)
  const {
    mutate: createTicketMutate,
    reset: createTicketReset,
    isPending,
    isSuccess,
    isError,
    isIdle,
  } = useCreateTicket()

  const handleFormModalSubmit = useCallback(
    (data: ContactSupportFieldValues) => {
      createTicketMutate(data)
    },
    [createTicketMutate]
  )

  const hideCreateTicketModal = useCallback(() => {
    dispatch(setCreateTicketModalVisible(false))
    createTicketReset()
  }, [dispatch, createTicketReset])

  if (!createTicketModalVisible) {
    return null
  }

  return (
    <>
      <ContactSupportFormModal
        opened={isIdle}
        files={[{ name: zippedLogsFileName }]}
        onSubmit={handleFormModalSubmit}
        onClose={hideCreateTicketModal}
      />
      <ContactSupportSendingModal opened={isPending} />

      <ContactSupportSuccessModal
        opened={isSuccess}
        onClose={hideCreateTicketModal}
      />
      <ContactSupportErrorModal
        opened={isError}
        onClose={hideCreateTicketModal}
      />
    </>
  )
}
