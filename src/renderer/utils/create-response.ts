const createResponse = (statusCode: number, statusMessage: string) => ({
  body: JSON.stringify({
    message: statusMessage,
    status: statusCode,
  }),
  statusCode,
})

export default createResponse
