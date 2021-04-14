/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FormattedMessage } from "react-intl"
import { Message } from "Renderer/interfaces/message.interface"

// temporary work-around (see https://github.com/yahoo/babel-plugin-react-intl/issues/119)
const FormattedMessageFixed = (props: Message): JSX.Element => {
  return <FormattedMessage {...props} />
}

export default FormattedMessageFixed
