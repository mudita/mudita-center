import { Endpoint, EventName, Method, RequestConfig, Response } from "./types";
import { CreatePhonePort } from "./phone-port";
import { Contact, CountBodyResponse } from "./endpoints/contact.types";
import { DeviceInfo } from "./endpoints/device-info.types";
interface Phones {
    id: string;
}
export declare const productId = "0100";
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
    request(id: string, config: {
        endpoint: Endpoint.Contacts;
        method: Method.Get;
        body: true;
    }): Promise<Response<CountBodyResponse>>;
    request(id: string, config: {
        endpoint: Endpoint.Contacts;
        method: Method.Get;
        body: number;
    }): Promise<Response<Contact[]>>;
    request(id: string, config: {
        endpoint: Endpoint.Contacts;
        method: Method.Post;
        body: Contact;
    }): Promise<Response<Contact>>;
    request(id: string, config: {
        endpoint: Endpoint.Contacts;
        method: Method.Put;
        body: Contact;
    }): Promise<Response<Contact>>;
    request(id: string, config: {
        endpoint: Endpoint.Contacts;
        method: Method.Delete;
        body: Pick<Contact, "id">;
    }): Promise<Response<string>>;
    request(id: string, config: {
        endpoint: Endpoint.PureUpdate;
        method: Method.Post;
        file: string;
    }): Promise<Response>;
    request(id: string, config: {
        endpoint: Endpoint.File;
        method: Method.Post;
        file: string;
    }): Promise<Response>;
    request(id: string, config: RequestConfig): Promise<Response<any>>;
    on(id: string, channelName: EventName, listener: () => void): void;
    off(id: string, channelName: EventName, listener: () => void): void;
    private removePhonePortOnDisconnectionEvent;
}
export default class extends PureNode {
    constructor();
}
export {};
