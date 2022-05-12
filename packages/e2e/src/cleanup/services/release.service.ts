import { join } from "path"
import { createWriteStream, unlinkSync } from "fs"
import { GithubHttpAdapterClass } from "../adapters"
import { DecompressTarCommandClass } from "../commands"
import { TestConfigurationProviderClass } from "../providers"
import { Manifest, Asset } from "../types"
import { ReleaseServiceClass } from "./release-service.class"
import { sleep } from "../helpers"

export class ReleaseService implements ReleaseServiceClass {
  constructor(
    private githubAdapter: GithubHttpAdapterClass,
    private decompressCommand: DecompressTarCommandClass,
    private configurationProvider: TestConfigurationProviderClass
  ) {}

  public async downloadImage(): Promise<string> {
    const asset = await this.getOsImageAsset(
      this.configurationProvider.config.initialOsVersion
    )

    const tmpPath = join(process.cwd(), "tmp")
    const tarArchivePath = join(tmpPath, asset.name)
    const imagePath = join(tmpPath, "PurePhone.img")

    await this.downloadArchivedOsImage(asset, tarArchivePath)
    await sleep()
    await this.decompressCommand.exec(tarArchivePath, tmpPath)
    await unlinkSync(tarArchivePath)

    return imagePath
  }

  private async getOsImageAsset(tag: string): Promise<Asset> {
    const release = await this.githubAdapter.getReleaseByTag(tag)
    const manifest = release.assets.find(
      (asset) => asset.name === "manifest.json"
    )
    const manifestData = await this.githubAdapter.request<Manifest>(
      manifest.browser_download_url,
      "GET"
    )

    const purePhone = manifestData.releases.find(
      (release) => release.target === "PurePhone"
    )
    return release.assets.find((asset) => asset.name === purePhone.files.image)
  }

  private async downloadArchivedOsImage(
    asset: Asset,
    archivePath: string
  ): Promise<void> {
    const response = await this.githubAdapter.request<any>(
      asset.browser_download_url,
      "GET",
      "stream"
    )
    await response.pipe(createWriteStream(archivePath))
  }
}
