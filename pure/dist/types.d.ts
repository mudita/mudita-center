export declare enum ResponseStatus {
    Ok = "ok",
    Error = "error"
}
export interface Response {
    status: ResponseStatus;
}
export declare enum EventName {
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
    Callog = 9
}
export declare enum Method {
    Get = 1,
    Post = 2,
    Put = 3,
    Delete = 4
}
export interface RequestConfig {
    endpoint: Endpoint;
    method: Method;
    body?: any;
}
