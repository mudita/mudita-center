import { URL_MAIN, URL_TABS } from "../constants/urls"
import { LocationState } from "history"
import * as H from "history"

const navigateTo = (
  history: H.History<LocationState>,
  link:
    | typeof URL_MAIN[keyof typeof URL_MAIN]
    | typeof URL_TABS[keyof typeof URL_TABS],
  searchValue: Record<string, string>
): void => {
  history.push(`${link}?${new URLSearchParams(searchValue).toString()}`)
}

export default navigateTo
