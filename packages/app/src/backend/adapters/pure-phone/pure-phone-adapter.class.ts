import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneAdapter {
  public abstract getName(): string
  public abstract getModelName(): string
  public abstract getModelNumber(): string
  public abstract getSerialNumber(): string
  public abstract getOsVersion(): Promise<DeviceResponse<string>>
  public abstract getOsUpdateDate(): string
  public abstract disconnectDevice(): DeviceResponse
  public abstract connectDevice(): Promise<DeviceResponse>
  public abstract updateOs(
    filePath: string,
    progressChannel: string
  ): Promise<DeviceResponse>
}
