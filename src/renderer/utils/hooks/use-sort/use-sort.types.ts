export enum SortDirection {
  Ascending,
  Descending,
}

export type Dictionary = Record<string, SortDirection>
export type SimpleDictionary<T = any> = Record<string, T>

export interface SortState<T> {
  data: T[]
  sortDirection: Dictionary
}

export interface SortAction<T> {
  data: T[]
  sortKey: string
}

export interface UseSort<T> {
  data: T[]
  sort: (term: string) => void
  sortDirection: Dictionary
}

export interface GetData<T = Dictionary> {
  dataToSort: T[]
  hasBeenSorted: boolean
  sortDirection: Dictionary
  sortKey: string
}
