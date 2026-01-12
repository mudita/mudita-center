/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Fragment, FunctionComponent } from "react"
import { Contact } from "devices/common/models"

interface Props {
  contact: Pick<
    Contact,
    "displayName1" | "displayName2" | "displayName3" | "displayName4"
  >
}

export const NameField: FunctionComponent<Props> = ({ contact }) => {
  const names = [
    contact.displayName1,
    contact.displayName2,
    <strong>{contact.displayName3}</strong>,
    contact.displayName4,
  ].filter(Boolean)

  return (
    <>
      {names.map((name, index) => (
        <Fragment key={index}>
          {name}
          {index === names.length - 1 ? "" : " "}
        </Fragment>
      ))}
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
    .trim()
}
