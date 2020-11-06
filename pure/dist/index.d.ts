declare class PureNode {
    portInit(cb: (phones: any[]) => void): void;
    on(chanelName: string, listener: (event: any) => void): void;
    init(path: string): void;
}
export default PureNode;
