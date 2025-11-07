/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Contact } from "devices/common/models"

interface Props {
  contact: Pick<
    Contact,
    "displayName1" | "displayName2" | "displayName3" | "displayName4"
  >
}

export const NameField: FunctionComponent<Props> = ({ contact }) => {
  return (
    <>
      {contact.displayName1} {contact.displayName2}{" "}
      <strong>{contact.displayName3}</strong> {contact.displayName4}
    </>
  )
}

export const makeName = (contact: Props["contact"], withBold?: boolean) => {
  return [
    contact.displayName1,
    contact.displayName2,
    ...(contact.displayName3
      ? [withBold ? `<b>${contact.displayName3}</b>` : contact.displayName3]
      : []),
    contact.displayName4,
  ]
    .filter(Boolean)
    .join(" ")
}
