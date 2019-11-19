import { connectRouter } from "connected-react-router"
import { History } from "history"
import { combineReducers } from "redux"
import history from "Renderer/routes/history"
import RootState from "./state"

const createRootReducer = (historyState: History) =>
  combineReducers<RootState>({
    router: connectRouter(historyState),
  })

export default createRootReducer(history)
