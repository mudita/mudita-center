import { Device } from "usb"

export interface SerialPortAdapterClass {
  request(device: Device, payload: any): Promise<string>
}
