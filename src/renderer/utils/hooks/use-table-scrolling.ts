import { useState } from "react"

const useTableScrolling = () => {
  const [scrollable, setScrollingAbility] = useState(true)

  const disableScroll = () => setScrollingAbility(false)
  const enableScroll = () => setScrollingAbility(true)

  return {
    disableScroll,
    enableScroll,
    scrollable,
  }
}

export default useTableScrolling
