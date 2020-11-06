interface Phones {
    id: string;
}
export declare const productId = "0100";
export declare const manufacturer = "Mudita";
declare class PureNode {
    static getPhones(): Promise<Phones[]>;
    private static getSerialPortList;
    portInit(cb: (phones: any[]) => void): void;
    on(chanelName: string, listener: (event: any) => void): void;
    init(path: string): void;
}
export default PureNode;
