import { URL_MAIN, URL_TABS } from "../constants/urls"
import { History, LocationState } from "history"

const navigateTo = (
  history: History<LocationState>,
  link:
    | typeof URL_MAIN[keyof typeof URL_MAIN]
    | typeof URL_TABS[keyof typeof URL_TABS],
  searchValue: Record<string, string>
): void => {
  history.push(`${link}?${new URLSearchParams(searchValue).toString()}`)
}

export default navigateTo
