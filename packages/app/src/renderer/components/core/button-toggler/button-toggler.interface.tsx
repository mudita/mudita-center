import { Message as MessageInterface } from "Renderer/interfaces/message.interface"

export interface ButtonTogglerItemProps {
  filled?: boolean
  active?: boolean
}

export interface ButtonTogglerProps {
  filled?: boolean
  tooltipTitle?: MessageInterface
  tooltipDescription?: MessageInterface
}
