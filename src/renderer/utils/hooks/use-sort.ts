import { useState } from "react"
import { sortBy } from "lodash"

type SortDirType = { [term: string]: boolean }

interface UseSort<T> {
  data: T[]
  sort: (term: string) => void
  sortDir: SortDirType
}

export default function useSort<T = SortDirType>(input: T[]): UseSort<T> {
  const [data, setData] = useState(input)
  const [sortDir, setSortDir] = useState<SortDirType>({})

  const sort = (term: string): void => {
    const sorted = sortBy([...data], term)

    setSortDir((current: SortDirType) => ({
      ...current,
      [term]: term in current ? !current[term] : true,
    }))

    setData(sortDir[term] ? sorted : sorted.reverse())
  }

  return { data, sort, sortDir }
}
