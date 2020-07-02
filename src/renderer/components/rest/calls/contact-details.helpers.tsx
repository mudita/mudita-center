import React from "react"

import Icon from "Renderer/components/core/icon/icon.component"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import Text from "Renderer/components/core/text/text.component"
import { CallStatus } from "Renderer/models/calls/calls.interface"

export interface CallDetails {
  icon: React.ReactNode
  description: React.ReactNode
}

const createCallType = (icon: IconType, description: string): CallDetails => {
  return {
    icon: <Icon type={icon} width="auto" />,
    description: <Text message={{ id: description }} element="span" />,
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
