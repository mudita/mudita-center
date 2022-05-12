import { Method, ResponseType } from "axios"
import { Release } from "../types"

export interface GithubHttpAdapterClass {
  getReleaseByTag(tag: string): Promise<Release>
  request<Type>(
    url: string,
    method: Method,
    responseType?: ResponseType
  ): Promise<Type>
}
