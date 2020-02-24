import { SimCard } from "Renderer/models/basic-info/interfaces"

export const getActiveNetworkFromSim = (simCards: SimCard[]) => {
  if (simCards.length === 0) {
    return ""
  }
  const activeSimCard = simCards.filter(simCard => simCard.active === true)
  return activeSimCard[0].network
}
