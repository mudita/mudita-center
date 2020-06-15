import { useState } from "react"
import { sortBy } from "lodash"

type Dictionary = { [k: string]: boolean }

interface UseSort<T> {
  data: T[]
  sort: (term: string) => void
  sortDir: Dictionary
}

const useSort = <T = Dictionary>(input: T[]): UseSort<T> => {
  const [data, setData] = useState(input)
  const [sortDir, setSortDir] = useState<Dictionary>({})

  const sort = (term: string): void => {
    const sorted = sortBy([...data], term)

    setSortDir((current: Dictionary) => ({
      ...current,
      [term]: term in current ? !current[term] : true,
    }))

    return setData(sortDir[term] ? sorted : sorted.reverse())
  }

  return { data, sort, sortDir }
}

export default useSort
