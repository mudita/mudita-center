import { URL_MAIN } from "../constants/urls"
import navigateTo from "Renderer/utils/navigate-to"

const navigateToThreadInMessages = (
  phoneNumber: string,
  callerId: string
): void => {
  navigateTo(URL_MAIN.messages, { phoneNumber, callerId })
}

export default navigateToThreadInMessages
