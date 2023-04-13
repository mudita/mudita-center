import { useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { contactsStateSelector } from "App/contacts/selectors"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { defineMessages } from "react-intl"
import { textFormatters } from "App/__deprecated__/renderer/utils/intl"
import React, { useEffect, useState } from "react"

export const messages = defineMessages({
  deletedInfo: { id: "module.contacts.deletePopup" },
})

const DeleteContactsPopup = () => {
  const getContactsCount = createSelector(
    contactsStateSelector,
    (contacts) => contacts.deletedCount
  )
  const contactsCount = useSelector(getContactsCount)
  const [showPopup, setShowPopup] = useState(Boolean(contactsCount))
  const [previousContactsCount, setPreviousContactsCount] =
    useState(contactsCount)

  useEffect(() => {
    if (contactsCount > 0) {
      setShowPopup(true)
      setPreviousContactsCount(contactsCount)
    }
    const hideInfoPopupsTimeout = setTimeout(() => {
      setShowPopup(false)
      setPreviousContactsCount(0)
    }, 5000)

    return () => {
      clearTimeout(hideInfoPopupsTimeout)
    }
  }, [contactsCount])

  if (!showPopup) return null

  return (
    <InfoPopup
      message={{
        ...messages.deletedInfo,
        values: {
          ...textFormatters,
          num: previousContactsCount,
        },
      }}
    />
  )
}
export default DeleteContactsPopup
