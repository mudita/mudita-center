import UsbDetector from "./usb-detector";
import { CreatePhonePort } from "./phone-port";
import { EventName, RequestConfig, Response } from "./types";
interface Phones {
    id: string;
}
export declare const productId = "0100";
export declare const manufacturer = "Mudita";
declare class PureNode {
    private createPhonePort;
    private usbDetector;
    static getPhones(): Promise<Phones[]>;
    private static isMuditaPurePhone;
    private static getSerialPortList;
    private phonePortMap;
    private eventEmitter;
    constructor(createPhonePort: CreatePhonePort, usbDetector: UsbDetector);
    connect(id: string): Promise<Response>;
    disconnect(id: string): Promise<Response>;
    request(id: string, config: RequestConfig): Promise<Response<any>>;
    on(id: string, channelName: EventName, listener: () => void): void;
    off(id: string, channelName: EventName, listener: () => void): void;
    onAttachPhone(listener: (event: string) => void): void;
    offAttachPhone(listener: (event: string) => void): void;
    private removePhonePortOnDisconnectionEvent;
}
export default class extends PureNode {
    constructor();
}
export {};
