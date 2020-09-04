import logger from "./logger"

test("logger logs silly message properly", () => {
  jest.spyOn(logger, "silly")
  logger.silly("Silly")
  expect(logger.silly).toHaveBeenCalledWith("Silly")
})

test("logger logs info message properly", () => {
  jest.spyOn(logger, "info")
  logger.info("Info")
  expect(logger.info).toHaveBeenCalledWith("Info")
})

test("logger logs error message properly", () => {
  jest.spyOn(logger, "error")
  logger.error("Error")
  expect(logger.error).toHaveBeenCalledWith("Error")
})
