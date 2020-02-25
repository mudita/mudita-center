const ebi = require("electron-better-ipc")

/**
 * Mocks some parts of electron-better-ipc related to the back-end requests
 * registration and handling.
 *
 * Use it to validate that your requests are properly there and do what's
 * expected of them.
 *
 * @example
 * // In the code.
 * createEndpoint({
 *   name: IpcRequest.GetSomeInfo,
 *   handler: someHandler,
 * })
 *
 * // In the test, get the first result.
 * const [result] = (ipcMain as any)._flush(IpcRequest.GetSomeInfo)
 * expect(result).toMatchInlineSnapshot(`...`)
 *
 */
const createMock = () => {
  const mock = {
    ...ebi,
    __calls: {},
    ipcMain: {
      ...ebi.ipcMain,
      answerRenderer: jest.fn((name, handler) => {
        if (!mock.__calls[name]) {
          mock.__calls[name] = []
        }
        mock.__calls[name].push(handler)
      }),
      _flush: (name, ...values) => {
        if (!mock.__calls[name]) {
          throw new Error(`No "${name}" call registered.`)
        } else {
          return mock.__calls[name].map(call => call(...values))
        }
      },
    },
    ipcRenderer: {
      __rendererCalls: {},
      ...ebi.ipcRenderer,
      callMain: jest.fn(name => {
        console.log(mock.ipcRenderer.__rendererCalls)
        if (!mock.ipcRenderer.__rendererCalls[name]) {
          return mock.ipcRenderer.__rendererCalls[name]
        } else {
          throw new Error(`No call with name: ${name}`)
        }
      }),
    },
  }
  return mock
}

module.exports = createMock()
