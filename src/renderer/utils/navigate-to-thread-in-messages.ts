import { URL_MAIN } from "../constants/urls"
import { useHistory } from "react-router-dom"

const navigateToThreadInMessages = (
  phoneNumber: string,
  callerId: string
): void => {
  const history = useHistory()
  history.push(
    `${URL_MAIN.messages}?phoneNumber=${phoneNumber}&callerId=${callerId}`
  )
}

export default navigateToThreadInMessages
