/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { Message } from "Renderer/interfaces/message.interface"
import { CallStatus } from "Renderer/models/calls/calls.interface"

export interface CallDetails {
  icon: IconType
  description: Message
}

const createCallType = (icon: IconType, description: Message): CallDetails => {
  return {
    icon,
    description,
  }
}

const messages = defineMessages({
  conference: { id: "module.calls.conference" },
  incoming: { id: "module.calls.incoming" },
  missed: { id: "module.calls.missed" },
  outgoing: { id: "module.calls.outgoing" },
})

export const resolveCallType = (type: CallStatus): CallDetails => {
  switch (type) {
    case CallStatus.Conference: {
      return createCallType(IconType.ConferenceCall, messages.conference)
    }

    case CallStatus.Incoming: {
      return createCallType(IconType.IncomingCall, messages.incoming)
    }

    case CallStatus.Missed: {
      return createCallType(IconType.MissedCall, messages.missed)
    }

    case CallStatus.Outgoing:
    default: {
      return createCallType(IconType.OutgoingCall, messages.outgoing)
    }
  }
}
