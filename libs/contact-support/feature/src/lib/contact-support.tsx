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
import { selectContactSupportModalVisible } from "./store/contact-support.selectors"
import { useCreateTicket } from "./use-contact-support"
import { setContactSupportModalVisible } from "./store/contact-support.actions"

const todayFormatDate = format(new Date(), "dd-MM-yy")
const zippedLogsFileName = `${todayFormatDate} Mudita Center.zip`

export const ContactSupport: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const modalVisible = useSelector(selectContactSupportModalVisible)
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

  const hideModalVisible = useCallback(() => {
    dispatch(setContactSupportModalVisible(false))
    createTicketReset()
  }, [dispatch, createTicketReset])

  if (!modalVisible) {
    return null
  }

  return (
    <>
      <ContactSupportFormModal
        opened={isIdle}
        files={[{ name: zippedLogsFileName }]}
        onSubmit={handleFormModalSubmit}
        onClose={hideModalVisible}
      />
      <ContactSupportSendingModal opened={isPending} />

      <ContactSupportSuccessModal
        opened={isSuccess}
        onClose={hideModalVisible}
      />
      <ContactSupportErrorModal opened={isError} onClose={hideModalVisible} />
    </>
  )
}
