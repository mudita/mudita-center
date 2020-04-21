import SerialPort, { PortInfo } from "serialport"

class USB {
  private port?: SerialPort = undefined
  private device?: PortInfo = undefined

  public async getPorts() {
    return await SerialPort.list()
  }

  public setDevice(device: PortInfo) {
    this.device = device
  }

  public connect() {
    if (!this.port && this.device) {
      this.port = new SerialPort(this.device.path).setEncoding("utf8")
    }
    return this.port
  }
}

const usb = new USB()

export default usb
