/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSelector } from "react-redux"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { defineMessages } from "react-intl"
import { textFormatters } from "App/__deprecated__/renderer/utils/intl"
import React, { useEffect, useState } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { getContactsDeleteCountSelector } from "App/contacts/selectors/contacts-delete-count.selector"

export const messages = defineMessages({
  deletedPopup: { id: "module.contacts.deletePopup" },
})

const DeleteContactsPopup: FunctionComponent = () => {
  const contactsDeleteCount = useSelector(getContactsDeleteCountSelector)
  const [showPopup, setShowPopup] = useState(Boolean(contactsDeleteCount))
  const [previousContactsDeleteCount, setPreviousContactsDeleteCount] =
    useState(contactsDeleteCount)

  useEffect(() => {
    if (contactsDeleteCount > 0) {
      setShowPopup(true)
      setPreviousContactsDeleteCount(contactsDeleteCount)
    }
    const hideInfoPopupsTimeout = setTimeout(() => {
      setShowPopup(false)
      setPreviousContactsDeleteCount(0)
    }, 5000)

    return () => {
      clearTimeout(hideInfoPopupsTimeout)
    }
  }, [contactsDeleteCount])

  if (!showPopup) {
    return null
  }

  return (
    <InfoPopup
      message={{
        ...messages.deletedPopup,
        values: {
          ...textFormatters,
          num: previousContactsDeleteCount,
        },
      }}
    />
  )
}
export default DeleteContactsPopup
