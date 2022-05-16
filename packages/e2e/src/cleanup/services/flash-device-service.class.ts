export interface FlashDeviceServiceClass {
  flashDevice(imagePath: string): Promise<void>
}
