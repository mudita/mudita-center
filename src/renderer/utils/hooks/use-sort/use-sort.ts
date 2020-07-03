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
      sorted: sortKey in sortDirection,
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
  if (input.length === 0) {
    return {
      data: input,
      sortDirection: {},
      sort: () => false,
    }
  }

  const [state, dispatch] = useReducer(sortReducer, {
    data: input,
    sortDirection: createSortDirection(input),
  })
  const { data, sortDirection } = state

  const sort = (term: string): void => {
    return dispatch({ data, sortKey: term })
  }

  return { sort, data: data as T[], sortDirection }
}

export default useSort
