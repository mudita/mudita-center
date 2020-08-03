export enum SortDirection {
  Ascending = "Ascending",
  Descending = "Descending",
}

export type SortingDictionary = Record<string, SortDirection>
export type SimpleSortingDictionary<T = any> = Record<string, T>

export interface UseSort<T> {
  data: T[]
  sort: (term: string, payload?: T[]) => void
  sortDirection: SortingDictionary
  refresh: (payload?: T[]) => void
}

export interface GetData<T = SortingDictionary> {
  dataToSort: T[]
  sorted: boolean
  sortDirection: SortingDictionary
  sortKey: string
  dontFlip?: boolean
}
