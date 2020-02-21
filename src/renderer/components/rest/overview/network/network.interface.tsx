import { SimCard } from "Renderer/models/basicInfo/interfaces"

export interface NetworkProps {
  simCards?: SimCard[]
  onSimChange?: (sim: SimCard) => void
}
