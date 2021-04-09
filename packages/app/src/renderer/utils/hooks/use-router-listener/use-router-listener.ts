import { History } from "history"
import { useEffect } from "react"

const useRouterListener = (history: Pick<History, "listen">, actions: {[key: string]: Function}) => {
  useEffect(() => {
    return history.listen((location) => {
      if (Object.keys(actions).includes((location.pathname))) {
        actions[location.pathname]()
      }
    })
  },[history])
}

export default useRouterListener
