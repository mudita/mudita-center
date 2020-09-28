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

  useEffect(() => {
    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  })
}

export default useOutsideClick
