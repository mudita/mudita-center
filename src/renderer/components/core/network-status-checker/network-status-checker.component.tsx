import FunctionComponent from "Renderer/types/function-component.interface"
import { useEffect } from "react"

interface Props {
  updateOnlineStatus: () => void
}

const NetworkStatusChecker: FunctionComponent<Props> = ({
  updateOnlineStatus,
}) => {
  useEffect(() => {
    updateOnlineStatus()
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)
  }, [])
  return null
}

export default NetworkStatusChecker
