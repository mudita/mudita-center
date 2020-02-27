import { SimCard } from "Renderer/models/basic-info/interfaces"

export const getActiveNetworkFromSim = (simCards: SimCard[] = []) => {
  const activeSimCard = simCards.filter(simCard => simCard.active)
  if (activeSimCard.length === 0) {
    return "No connection"
  }
  return activeSimCard[0].network
}
