import semver from "semver/preload"

class VersionValidateHelper {
  public async isVersionValid(version: string): Promise<boolean> {
    return Boolean(semver.valid(version))
  }
}

export default new VersionValidateHelper()
