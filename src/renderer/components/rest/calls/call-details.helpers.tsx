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
  conference: { id: "view.name.calls.conference" },
  incoming: { id: "view.name.calls.incoming" },
  missed: { id: "view.name.calls.missed" },
  outgoing: { id: "view.name.calls.outgoing" },
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
