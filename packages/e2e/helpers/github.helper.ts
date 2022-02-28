import axios, { AxiosInstance } from "axios"

class GitHubHelper {
  private gitHubInstance: AxiosInstance

  constructor() {
    this.gitHubInstance = axios.create({
      baseURL: "https://api.github.com/repos/mudita/MuditaOS",
      headers: {
        Authorization: `token ${process.env.TEST_GITHUB_TOKEN}`,
      },
    })
  }

  public async getLatestReleaseVersion(): Promise<string> {
    const { data } = await this.gitHubInstance.get("/releases", {
      params: {
        per_page: 100,
      },
    })

    const release = data.find(
      (release) =>
        !release.draft &&
        !release.prerelease &&
        release.tag_name.includes("pure_")
    )

    return release.tag_name.split("_")[1]
  }
}

export default new GitHubHelper()
