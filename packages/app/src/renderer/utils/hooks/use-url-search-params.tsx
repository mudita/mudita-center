import { useLocation } from "react-router"

const useURLSearchParams = (): URLSearchParams =>
  new URLSearchParams(useLocation().search)

export default useURLSearchParams
