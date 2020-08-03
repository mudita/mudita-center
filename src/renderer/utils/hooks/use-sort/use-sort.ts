import { orderBy } from "lodash"
import { useEffect, useReducer } from "react"
import {
  createSortDirection,
  getSortingDirection,
} from "Renderer/utils/hooks/use-sort/use-sort.helpers"
import {
  SimpleSortingDictionary,
  SortDirection,
  SortingDictionary,
  UseSort,
} from "Renderer/utils/hooks/use-sort/use-sort.types"

enum SortModes {
  Sort = "Sort",
  Refresh = "Refresh",
}

type SortAction<T = any> = { type: SortModes; payload: T; sortKey?: string }

const sortAction = <T = any>(payload: T, sortKey: string): SortAction<T> => ({
  type: SortModes.Sort,
  payload,
  sortKey,
})

const refreshAction = <T = any>(payload: T): SortAction<T> => ({
  type: SortModes.Refresh,
  payload,
})

export interface SortState<T> {
  data: T[]
  sortDirection: SortingDictionary
  currentSortKey?: string
}

const sortReducer = (state: SortState<any>, action: any) => {
  const { sortDirection, currentSortKey } = state
  const { type, payload, sortKey } = action

  switch (type) {
    case SortModes.Sort: {
      const shouldReverse = sortDirection[sortKey] !== SortDirection.Descending
      const data = orderBy(payload, [sortKey], [shouldReverse ? "desc" : "asc"])

      return {
        currentSortKey: sortKey,
        data,
        sortDirection: {
          ...sortDirection,
          [sortKey]: getSortingDirection(sortDirection[sortKey]),
        },
      }
    }

    case SortModes.Refresh: {
      const emergencyKey = Object.keys(payload[0])[0]
      const existingSortKey = currentSortKey || emergencyKey
      const data = orderBy(payload, [existingSortKey], ["desc"])

      return {
        currentSortKey: existingSortKey,
        data,
        sortDirection,
      }
    }

    default: {
      return state
    }
  }
}

const useSort = <T = SimpleSortingDictionary>(input: T[]): UseSort<T> => {
  if (input.length === 0) {
    return {
      data: input,
      sortDirection: {},
      sort: () => false,
      refresh: () => false,
    }
  }

  const [state, dispatch] = useReducer(sortReducer, {
    currentSortKey: Object.keys(input[0])[0],
    data: input,
    sortDirection: createSortDirection(input),
  })

  useEffect(() => {
    refresh(input)
  }, [input])

  const sort = (term: string, payload?: T[]) => {
    return dispatch(sortAction(payload || input, term))
  }

  const refresh = (payload?: T[]) => dispatch(refreshAction(payload || input))

  const { data } = state

  return {
    sort,
    refresh,
    ...state,
    data: data as T[],
  }
}

export default useSort
