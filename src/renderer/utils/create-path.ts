import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"

const createPath = (
  link:
    | typeof URL_MAIN[keyof typeof URL_MAIN]
    | typeof URL_TABS[keyof typeof URL_TABS],
  searchValue: Record<string, string>
): string => {
  return `${link}?${new URLSearchParams(searchValue).toString()}`
}

export default createPath
