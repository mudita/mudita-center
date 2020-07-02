import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { CallStatus } from "Renderer/models/calls/calls.interface"

export interface CallDetails {
  icon: IconType
  description: string
}

const createCallType = (icon: IconType, description: string): CallDetails => {
  return {
    icon,
    description,
  }
}

export const callTypeResolver = (type: CallStatus): CallDetails => {
  switch (type) {
    case CallStatus.Conference: {
      return createCallType(IconType.More, "view.name.calls.conference")
    }

    case CallStatus.Incoming: {
      return createCallType(IconType.Download, "view.name.calls.incoming")
    }

    case CallStatus.Missed: {
      return createCallType(IconType.Close, "view.name.calls.missed")
    }

    case CallStatus.Outgoing:
    default: {
      return createCallType(IconType.Upload, "view.name.calls.outgoing")
    }
  }
}
