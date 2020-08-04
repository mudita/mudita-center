import log from "Renderer/utils/log"

test("log logs message properly", () => {
  jest.spyOn(log, "log")
  log.log("Message")
  expect(log.log).toHaveBeenCalledWith("Message")
})

test("log logs info message properly", () => {
  jest.spyOn(log, "info")
  log.info("Info")
  expect(log.info).toHaveBeenCalledWith("Info")
})

test("log logs warning message properly", () => {
  jest.spyOn(log, "warn")
  log.warn("Warning")
  expect(log.warn).toHaveBeenCalledWith("Warning")
})

test("log logs error message properly", () => {
  jest.spyOn(log, "error")
  log.error("Error")
  expect(log.error).toHaveBeenCalledWith("Error")
})
