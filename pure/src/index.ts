class PureNode {
  public portInit(cb: (phones: any[]) => void): void {}
  public on(chanelName: string, listener: (event: any) => void): void {}
  public init(path: string): void {}
}

export default PureNode
