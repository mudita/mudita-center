import { URL_MAIN, URL_TABS } from "../constants/urls"
import { useHistory } from "react-router-dom"

const navigateTo = (
  link:
    | typeof URL_MAIN[keyof typeof URL_MAIN]
    | typeof URL_TABS[keyof typeof URL_TABS],
  searchValue: Record<string, string>
): void => {
  const history = useHistory()
  history.push(`${link}?${new URLSearchParams(searchValue).toString()}`)
}

export default navigateTo
