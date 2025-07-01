/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback } from "react"
import { useSelector } from "react-redux"
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

export const ContactSupport: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const createTicketModalVisible = useSelector(selectCreateTicketModalVisible)
  const {
    mutate: createTicket,
    isPending,
    isSuccess,
    isError,
    isIdle,
  } = useCreateTicket()

  const sendTicket = useCallback(
    (data: ContactSupportFieldValues) => {
      createTicket(data)
    },
    [createTicket]
  )

  const closeContactSupportFlow = useCallback(() => {
    dispatch(setCreateTicketModalVisible(false))
  }, [dispatch])

  if (!createTicketModalVisible) {
    return null
  }

  return (
    <>
      {isIdle && (
        <ContactSupportFormModal
          files={[]}
          onSubmit={sendTicket}
          onClose={closeContactSupportFlow}
        />
      )}
      {isPending && <ContactSupportSendingModal />}
      {isSuccess && (
        <ContactSupportSuccessModal
          closeContactSupportFlow={closeContactSupportFlow}
        />
      )}
      {isError && (
        <ContactSupportErrorModal
          closeContactSupportFlow={closeContactSupportFlow}
        />
      )}
    </>
  )
}
