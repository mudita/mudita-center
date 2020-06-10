import { useState } from "react"
import { sortBy } from "lodash"

type Dict = { [term: string]: boolean }
interface UseSort<T> {
  data: T[]
  sort: (term: string) => void
  sortDir: Dict
}

export default function useSort<T = any>(input: T[]): UseSort<T> {
  const [data, setData] = useState(input)
  const [sortDir, setSortDir] = useState<{ [k: string]: boolean }>({})

  const sort = (term: string): void => {
    const sorted = sortBy([...data], term)

    setSortDir((current: Dict) => ({
      ...current,
      [term]: term in current ? !current[term] : true,
    }))

    setData(sortDir[term] ? sorted : sorted.reverse())
  }

  return { data, sort, sortDir }
}
