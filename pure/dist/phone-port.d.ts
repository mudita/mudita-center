import { Endpoint, PortEventName, Method, RequestConfig, Response } from "./phone-port.types";
import { Contact, CountBodyResponse } from "./endpoints/contact.types";
import { DeviceInfo } from "./endpoints/device-info.types";
declare class PhonePort {
    private path;
    private port;
    private eventEmitter;
    private isPolling;
    constructor(path: string);
    connect(): Promise<Response>;
    disconnect(): Promise<Response>;
    request(config: {
        endpoint: Endpoint.DeviceInfo;
        method: Method.Get;
    }): Promise<Response<DeviceInfo>>;
    request(config: {
        endpoint: Endpoint.Contacts;
        method: Method.Get;
        body: true;
    }): Promise<Response<CountBodyResponse>>;
    request(config: {
        endpoint: Endpoint.Contacts;
        method: Method.Get;
        body: number;
    }): Promise<Response<Contact[]>>;
    request(config: {
        endpoint: Endpoint.Contacts;
        method: Method.Post;
        body: Contact;
    }): Promise<Response<Contact>>;
    request(config: {
        endpoint: Endpoint.Contacts;
        method: Method.Put;
        body: Contact;
    }): Promise<Response<Contact>>;
    request(config: {
        endpoint: Endpoint.Contacts;
        method: Method.Delete;
        body: Contact["id"];
    }): Promise<Response<string>>;
    request(config: {
        endpoint: Endpoint.PureUpdate;
        method: Method.Post;
        file: string;
    }): Promise<Response>;
    request(config: {
        endpoint: Endpoint.File;
        method: Method.Post;
        file: string;
    }): Promise<Response>;
    request(config: RequestConfig): Promise<Response<any>>;
    on(eventName: PortEventName, listener: () => void): void;
    off(eventName: PortEventName, listener: () => void): void;
    private fileRequest;
    private pureUpdateRequest;
}
export declare type CreatePhonePort = (path: string) => PhonePort;
export declare const createPhonePort: CreatePhonePort;
export default PhonePort;
