import axios, { AxiosInstance, Method, ResponseType } from "axios"
import { Release } from "../types"
import { GithubHttpAdapterClass } from "./github-http-adapter.class"

export class GithubHttpAdapter implements GithubHttpAdapterClass {
  private gitHubInstance: AxiosInstance

  constructor() {
    this.gitHubInstance = axios.create({
      baseURL: "https://api.github.com/repos/mudita/MuditaOS",
      headers: {
        Authorization: `token ${process.env.TEST_GITHUB_TOKEN}`,
      },
    })
  }

  public async getReleaseByTag(tag: string): Promise<Release> {
    const { data } = await this.gitHubInstance.get<Release>(
      `/releases/tags/${tag}`
    )

    return data
  }

  public async request<Type>(
    url: string,
    method: Method,
    responseType: ResponseType = "document"
  ): Promise<Type> {
    const { data } = await axios({
      method,
      url,
      responseType,
    })

    return data
  }
}
