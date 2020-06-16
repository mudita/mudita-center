export enum SortDirection {
  Ascending = "Ascending",
  Descending = "Descending",
}

export type SortingDictionary = Record<string, SortDirection>
export type SimpleSortingDictionary<T = any> = Record<string, T>

export interface SortState<T> {
  data: T[]
  sortDirection: SortingDictionary
}

export interface SortAction<T> {
  data: T[]
  sortKey: string
}

export interface UseSort<T> {
  data: T[]
  sort: (term: string) => void
  sortDirection: SortingDictionary
}

export interface GetData<T = SortingDictionary> {
  dataToSort: T[]
  sorted: boolean
  sortDirection: SortingDictionary
  sortKey: string
}
