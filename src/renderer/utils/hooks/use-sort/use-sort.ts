import { sortBy } from "lodash"
import { useReducer } from "react"
import {
  createSortDirection,
  getData,
  getSortingDirection,
} from "Renderer/utils/hooks/use-sort/use-sort.helpers"
import {
  SortingDictionary,
  SimpleSortingDictionary,
  SortAction,
  SortState,
  UseSort,
} from "Renderer/utils/hooks/use-sort/use-sort.types"

const sortReducer = <T = SortingDictionary>(
  state: SortState<T>,
  action: SortAction<T>
): SortState<T> => {
  const { sortKey, data } = action
  const { sortDirection } = state

  return {
    data: getData({
      dataToSort: sortBy(data, sortKey),
      hasBeenSorted: sortKey in sortDirection,
      sortDirection,
      sortKey,
    }),
    sortDirection: {
      ...sortDirection,
      [sortKey]: getSortingDirection(sortDirection[sortKey]),
    },
  }
}

const useSort = <T = SimpleSortingDictionary>(input: T[]): UseSort<T> => {
  const [state, dispatch] = useReducer(sortReducer, {
    data: [...input],
    sortDirection: createSortDirection(input),
  })

  const sort = (term: string): void => dispatch({ data: input, sortKey: term })
  const { data, sortDirection } = state

  return { sort, data: data as T[], sortDirection }
}

export default useSort
