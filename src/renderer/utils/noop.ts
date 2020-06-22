export const noop = (...args: unknown[]): void => {
  // no operation here
}

export const asyncNoop = (...args: unknown[]): Promise<any> => {
  return new Promise<any>(resolve => resolve())
}
