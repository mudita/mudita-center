import { History } from "history"
import { useEffect } from "react"
import { ModelConfig, RematchStore } from "@rematch/core"
import { URL_MAIN } from "Renderer/constants/urls"


const useRouterListener = (history: Pick<History, "listen">, store: RematchStore<{ contacts: ModelConfig }>) => {
  useEffect(() => {
    return history.listen((location, action) => {
      console.log(window.location)
      if (location.pathname === URL_MAIN.contacts) {
        console.log("location", location, action)
        store.dispatch.contacts.loadData()
      }
      // console.log(`You changed the page to: ${location.pathname}`)
    })
  },[history])
}

export default useRouterListener
