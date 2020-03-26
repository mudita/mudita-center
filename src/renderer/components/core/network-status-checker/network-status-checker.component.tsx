import FunctionComponent from "Renderer/types/function-component.interface"
import { useEffect } from "react"

interface Props {
  getOnlineStatus: () => void
}

const NetworkStatusChecker: FunctionComponent<Props> = ({
  getOnlineStatus,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      getOnlineStatus()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return null
}

export default NetworkStatusChecker
