export declare enum ResponseStatus {
    Ok = 200,
    Accepted = 202,
    BadRequest = 400,
    NotAcceptable = 406,
    InternalServerError = 500,
    ConnectionError = 501
}
export interface Response<BODY = undefined> {
    status: ResponseStatus;
    body?: BODY;
    endpoint?: string;
    uuid?: string;
}
export declare enum PortEventName {
    Disconnected = "disconnected",
    DataReceived = "dataReceived"
}
export declare enum Endpoint {
    Invalid = 0,
    DeviceInfo = 1,
    Update = 2,
    FilesystemUpload = 3,
    Backup = 4,
    Restore = 5,
    Factory = 6,
    Contacts = 7,
    Messages = 8,
    Callog = 9,
    File = 100,
    PureUpdate = 101
}
export declare enum Method {
    Get = 1,
    Post = 2,
    Put = 3,
    Delete = 4
}
export declare enum BodyCommand {
    Download = "download"
}
export interface RequestConfig {
    endpoint: Endpoint;
    method: Method;
    body?: any;
    file?: string;
}
export declare enum FileResponseStatus {
    Ok = "0"
}
