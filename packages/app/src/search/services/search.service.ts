import { DataIndex } from "App/index-storage/constants"
import { IndexStorage } from "App/index-storage/types"
import assert from "assert"
import { SearchConfig } from "elasticlunr"

interface SearchParams<DtoType extends {} = {}> {
  query: string
  searchConfig?: SearchConfig<DtoType>
}

interface FetchRepository<DtoType> {
  findById: (id: string) => DtoType | undefined
}

export class SearchService {
  constructor(private readonly index: IndexStorage) {}

  search<DtoType>(
    type: DataIndex,
    repository: FetchRepository<DtoType>,
    searchParams: SearchParams<DtoType>
  ) {
    const index = this.index.get(type)

    assert(index)
    const searchIndexResult = index.search(
      searchParams.query,
      searchParams.searchConfig
    )

    console.log("mw_", searchParams)

    console.log("mw_", "searchIndexResult", searchIndexResult)

    const mappedModels = searchIndexResult
      .map((item) => repository.findById(item.ref))
      .filter((item): item is DtoType => Boolean(item))

    if (searchIndexResult.length !== mappedModels.length) {
      console.log(
        "mw_",
        "SOME WEIRD SITUATION HAPPEN! HANDLE ME BETTER!",
        searchIndexResult,
        mappedModels
      )
    }

    return mappedModels
  }
}
