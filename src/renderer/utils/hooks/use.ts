import { MutableRefObject, useEffect } from "react"

const useOutside = (
  ref: MutableRefObject<HTMLElement | undefined | null>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && ref.current.contains(event.target as Node)) {
      callback()
    }
  }

  // The useCapture is set as true in order to avoid click event being fired after a commit phase.
  useEffect(() => {
    document.addEventListener("mousedown", handleClick, true)

    return () => {
      document.removeEventListener("mousedown", handleClick, true)
    }
  })
}

export default useOutside
