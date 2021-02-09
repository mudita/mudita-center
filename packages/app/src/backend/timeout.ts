const timeout = (ms:number): [Promise<undefined>, () => void] => {
  let timeoutId: NodeJS.Timeout

  const promise = new Promise<undefined>((resolve) => {
    timeoutId = setTimeout(() => resolve(undefined), ms)
  })

  const cancel = () => clearTimeout(timeoutId)

  return [promise, cancel]
}

export default timeout
