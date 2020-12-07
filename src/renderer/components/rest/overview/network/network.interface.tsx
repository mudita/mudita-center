import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

export interface NetworkProps {
  simCards?: SimCard[]
  onSimChange?: (sim: SimCard) => void
}
