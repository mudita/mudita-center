import { SimCard } from "Renderer/models/basic-info/interfaces"

export interface NetworkProps {
  simCards?: SimCard[]
  onSimChange?: (sim: SimCard) => void
}
