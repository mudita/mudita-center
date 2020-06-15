import { useState } from "react"
import { sortBy } from "lodash"

type Dictionary = Record<string, boolean>

interface UseSort<T> {
  data: T[]
  sort: (term: string) => void
  sortDirection: Dictionary
}

const useSort = <T = Dictionary>(input: T[]): UseSort<T> => {
  const [data, setData] = useState(input)
  const [sortDirection, setSortDirection] = useState<Dictionary>({})

  const sort = (term: string): void => {
    const sorted = sortBy(data, term)

    setSortDirection((current: Dictionary) => ({
      ...current,
      [term]: term in current ? !current[term] : true,
    }))

    return setData(sortDirection[term] ? sorted : sorted.reverse())
  }

  return { data, sort, sortDirection }
}

export default useSort
