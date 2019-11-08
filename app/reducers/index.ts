import { connectRouter } from "connected-react-router"
import { History } from "history"
import { combineReducers } from "redux"
import { reducer as fileReducer } from "../files/reducers/files.reducer"
import RootState from "./state"

const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    files: fileReducer,
  })

export default createRootReducer
