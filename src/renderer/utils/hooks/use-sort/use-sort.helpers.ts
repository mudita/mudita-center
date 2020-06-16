import {
  SortingDictionary,
  GetData,
  SimpleSortingDictionary,
  SortDirection,
} from "Renderer/utils/hooks/use-sort/use-sort.types"
// import { mapValues } from "lodash"

export const getData = <T = SortingDictionary>({
  dataToSort,
  sorted,
  sortDirection,
  sortKey,
}: GetData<T>) => {
  if (sorted) {
    return sortDirection[sortKey] === SortDirection.Descending
      ? dataToSort
      : dataToSort.reverse()
  }

  return dataToSort
}

export const getSortingDirection = (term: SortDirection): SortDirection => {
  /**
   * When you want to add another state, simply create a new case
   * and modify `TableSortButton` accordingly.
   */
  switch (term) {
    case SortDirection.Descending:
      return SortDirection.Ascending
    case SortDirection.Ascending:
    default:
      return SortDirection.Descending
  }
}
export const createSortDirection = (
  input: (SortingDictionary | SimpleSortingDictionary)[]
): SortingDictionary => {
  return Object.keys(input[0]).reduce(
    (acc, item) => ({
      ...acc,
      [item]: SortDirection.Ascending,
    }),
    {}
  )
}
