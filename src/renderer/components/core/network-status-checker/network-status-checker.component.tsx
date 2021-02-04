import { FunctionComponent } from "Renderer/types/function-component.interface"
import { useEffect } from "react"

export interface NetworkStatusCheckerProps {
  updateOnlineStatus: () => void
}

const NetworkStatusChecker: FunctionComponent<NetworkStatusCheckerProps> = ({
  updateOnlineStatus,
}) => {
  useEffect(() => {
    updateOnlineStatus()
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)
    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])
  return null
}

export default NetworkStatusChecker
