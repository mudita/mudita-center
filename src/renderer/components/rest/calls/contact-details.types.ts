import { Type } from "Renderer/components/core/icon/icon.config"
import { Caller, CallStatus } from "Renderer/models/calls/calls.interface"

export interface Details {
  id: string
  caller: Caller
  duration: number
  date: Date
  status: CallStatus
  timesMissed: number
  icon: Type
  description: string
}
