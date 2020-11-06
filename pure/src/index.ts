interface Phones {
  id: string
}

class PureNode {
  public static getPhones(): Promise<Phones[]>{
    return Promise.resolve([])
  }

  public portInit(cb: (phones: any[]) => void): void {}
  public on(chanelName: string, listener: (event: any) => void): void {}
  public init(path: string): void {}
}

export default PureNode
