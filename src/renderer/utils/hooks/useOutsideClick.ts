import { MutableRefObject, useEffect } from "react"

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | undefined | null>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback()
    }
  }

  // The useCapture is set to true to avoid clicking event is fire after a commit phase.
  useEffect(() => {
    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  })
}

export default useOutsideClick
