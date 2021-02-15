const timeout = (ms: number): [Promise<void>, () => void] => {
  let timeoutId: NodeJS.Timeout

  const promise = new Promise<void>((resolve) => {
    timeoutId = setTimeout(() => resolve(), ms)
  })

  const cancel = () => clearTimeout(timeoutId)

  return [promise, cancel]
}

export default timeout
