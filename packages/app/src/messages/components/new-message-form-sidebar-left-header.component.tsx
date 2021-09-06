/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ContactInputSearch from "App/messages/components/contact-input-search/contact-input-search.component"

type ContactInputSearchProps = ComponentProps<typeof ContactInputSearch>

interface Props extends ContactInputSearchProps {}

const NewMessageFormSidebarLeftHeader: FunctionComponent<Props> = ({
  ...props
}) => {
  return <ContactInputSearch {...props} />
}

export default NewMessageFormSidebarLeftHeader
