import UsbDetector from "./usb-detector";
import PhonePort, { CreatePhonePort } from "./phone-port";
export declare const productId = "0100";
export declare const manufacturer = "Mudita";
export declare class PureNode {
    private createPhonePort;
    private usbDetector;
    private static isMuditaPurePhone;
    private static getSerialPortList;
    private eventEmitter;
    constructor(createPhonePort: CreatePhonePort, usbDetector: UsbDetector);
    getPhonePorts(): Promise<PhonePort[]>;
    onAttachPhone(listener: (event: PhonePort) => void): void;
    offAttachPhone(listener: (event: PhonePort) => void): void;
    private registerAttachDeviceListener;
}
declare const _default: PureNode;
export default _default;
