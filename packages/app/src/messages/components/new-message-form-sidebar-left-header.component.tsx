/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Contact } from "App/contacts/store/contacts.type"
import ContactInputSearch from "App/messages/components/contact-input-search/contact-input-search.component"

interface Props {
  results: Contact[]
  searchValue: string
  onSearchValueChange: (value: string) => void
}

const NewMessageFormSidebarLeftHeader: FunctionComponent<Props> = ({
  ...props
}) => {
  return (
    <ContactInputSearch
      showSearchResults={props.results.length === 0}
      {...props}
    />
  )
}

export default NewMessageFormSidebarLeftHeader
