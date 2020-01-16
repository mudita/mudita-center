export default abstract class PurePhoneAdapter {
  public abstract getName(): string
  public abstract getModelName(): string
  public abstract getModelNumber(): string
  public abstract getSerialNumber(): string
  public abstract getOsVersion(): string
  public abstract getOsUpdateDate(): string
}
