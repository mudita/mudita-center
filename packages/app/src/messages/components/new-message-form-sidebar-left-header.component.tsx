/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ReceiverInputSearch from "App/messages/components/receiver-input-search/receiver-input-search.component"

type ContactInputSearchProps = ComponentProps<typeof ReceiverInputSearch>

interface Props extends ContactInputSearchProps {}

const NewMessageFormSidebarLeftHeader: FunctionComponent<Props> = ({
  ...props
}) => {
  return <ReceiverInputSearch {...props} />
}

export default NewMessageFormSidebarLeftHeader
