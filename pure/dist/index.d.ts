import { Endpoint, EventName, Method, RequestConfig, Response } from "./types";
import { DeviceInfo } from "./device-info-endpoint.types";
import { CreatePhonePort } from "./phone-port";
interface Phones {
    id: string;
}
export declare const productId = "0622";
export declare const manufacturer = "Mudita";
declare class PureNode {
    private createPhonePort;
    static getPhones(): Promise<Phones[]>;
    private static getSerialPortList;
    private phonePortMap;
    constructor(createPhonePort: CreatePhonePort);
    connect(id: string): Promise<Response>;
    disconnect(id: string): Promise<Response>;
    request(id: string, config: {
        endpoint: Endpoint.DeviceInfo;
        method: Method.Get;
    }): Promise<Response<DeviceInfo>>;
    request(id: string, config: RequestConfig): Promise<Response<any>>;
    on(id: string, channelName: EventName, listener: () => void): void;
    off(id: string, channelName: EventName, listener: () => void): void;
    private removePhonePortOnDisconnectionEvent;
}
export default class extends PureNode {
    constructor();
}
export {};
