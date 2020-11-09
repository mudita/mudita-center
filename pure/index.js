"use strict"
var debug = require("debug")("PureJS")
const SerialPort = require("serialport")
const util = require("util")
const fs = require("fs")
const crc32 = require("crc-32")
var path = require("path")

const pureDefs = {
  packetType: {
    invalid: '"',
    endpoint: "#".charCodeAt(),
    rawData: "$".charCodeAt(),
  },
  method: {
    get: 1,
    post: 2,
    put: 3,
    del: 4,
  },
  enpoint: {
    invalid: 0,
    deviceInfo: 1,
    update: 2,
    filesystemUpload: 3,
    backup: 4,
    restore: 5,
    factory: 6,
    contacts: 7,
    messages: 8,
    callog: 9,
    developer: 10,
  },
  errorCode: {
    internalServerError: 500,
    notFound: 400,
    notAcceptable: 406,
    ok: 200,
    accepted: 202,
  },
  parserState: {
    none: -1,
    readingType: 0,
    readingSize: 1,
    readingPayload: 2,
  },

  usbManufacturer: "Mudita",
  usbProductId: "0100",
  updateFileChunkSize: 128,
}

function getNewUUID() {
  return Math.floor(Math.random() * 10000)
}

function createValidRequest(payload) {
  var requestStr = "#"
  const payloadAsString = JSON.stringify(payload)
  const sizeAsString = String(payloadAsString.length).padStart(9, "0")
  requestStr += sizeAsString
  requestStr += payloadAsString

  return requestStr
}

function createDataRequest(data) {
  var requestStr = "$"

  const sizeAsString = String(data.length).padStart(9, "0")
  requestStr += sizeAsString
  requestStr += data

  return requestStr
}

class PureNode {
  constructor(owner) {
    this.owner = owner

    this.currentPacket = {
      type: pureDefs.packetType.invalid,
      dataRaw: null,
      dataSizeToRead: Number(-1),
      dataSizeRead: Number(-1),
      dataObject: null,
    }

    this.pureCallbackReceiver = null
    this.parserState = pureDefs.parserState.none
    this.pingInterval = 3500
    this.isPolling = true
    this.updateFile = null
    this.updateFileSize = 0
    this.serialPortHandle = null
    this.purePhones = Array()
    this.portList = Array()
    this._version = "0.1"
    this.channels = {
      close: [],
      data: [],
    }
  }

  async portInit(asyncInitCallback) {
    debug("initializing")
    this.portList = await SerialPort.list()
    this.purePhones = []

    for (const port of this.portList) {
      debug("portInit possible port %o", port)
      if (port.productId == pureDefs.usbProductId) {
        this.purePhones.push(port)
      }
    }
    asyncInitCallback(this.purePhones)
    debug("pure list %o", this.purePhones)
  }

  get version() {
    return this._version
  }

  sendDeviceStatusRequest() {
    debug(
      "sendDeviceStatusRequest isPolling? %s",
      this.isPolling ? "true" : "false"
    )
    if (this.isPolling) {
      const uuid = getNewUUID()
      var request
      // we might need to force just the SIM update as it's a lengthy process
      // on the phone so we need to do it only when needed
      if (this.forceSIMQuery == true) {
        request = createValidRequest({
          endpoint: pureDefs.enpoint.deviceInfo,
          method: pureDefs.method.get,
          uuid: uuid,
          body: { forceSIMQuery: true },
        })
        this.forceSIMQuery = false
      } else {
        request = createValidRequest({
          endpoint: pureDefs.enpoint.deviceInfo,
          method: pureDefs.method.get,
          uuid: uuid,
        })
      }
      debug('sendDeviceStatusRequest write "%s"', request)
      this.serialPortHandle.write(request, function (err) {
        if (err) {
          debug("errror writing sendDeviceStatusRequest message %o", err)
          this.isPolling = false
        }
      })
    }

    this.timerObject = setTimeout(
      this.sendDeviceStatusRequest.bind(this),
      this.pingInterval
    )
  }

  portOpen() {
    debug("portOpen %o", this.serialPortHandle)
    this.isPolling = true

    // this.owner.onOpen()

    // set timeout initially to 0 after that we poll at a lowe rate
    this.timerObject = setTimeout(this.sendDeviceStatusRequest.bind(this), 0)
  }

  portError(err) {
    this.isPolling = false
    // this.owner.onError()
  }

  readType(arg) {
    debug("readType() arg[0] = %s", arg[0])

    if (
      arg[0] == pureDefs.packetType.endpoint ||
      arg[0] == pureDefs.packetType.rawData
    ) {
      this.currentPacket.type = arg[0]
    } else {
      throw new Exception("Invalid or unknown data type")
    }
    this.parserState = pureDefs.parserState.readingSize
  }

  readSize(arg) {
    debug('readSize sizeNumber = "%s"', arg.slice(1, 10))

    if (Number.isInteger(Number(arg.slice(1, 10)))) {
      this.currentPacket.dataSizeToRead = Number(arg.slice(1, 10).valueOf())
    } else {
      this.currentPacket.dataSizeToRead = Number(-1)
    }
    this.sendDeviceStatusRequest.bind(this)
    if (this.currentPacket.dataSizeToRead < 0) {
      throw new Exception(
        'Can\'t parse data size as number "%s"',
        arg.slice(1, 10)
      )
    }
    this.parserState = pureDefs.parserState.readingPayload
  }

  readPayload(arg) {
    debug("readPayload arg:%s", arg)

    // slice all data until the end of stream
    const slicedPayload = arg.slice(10, 10 + this.currentPacket.dataSizeToRead)

    debug(
      'readPayload payload: "%s" payloadLength',
      slicedPayload,
      slicedPayload.length
    )

    if (slicedPayload.length == this.currentPacket.dataSizeToRead) {
      // ideal situation all data is in
      this.parserState = pureDefs.parserState.none
      debug("readPayload got all data in one read")
      try {
        this.currentPacket.dataObject = JSON.parse(slicedPayload)
      } catch (syntaxError) {
        debug("can't parse payload data as JSON, %s", syntaxError)
      }

      debug("payload is a JSON object pass it to our application")
      this.channels["data"].forEach((fn) => fn(JSON.parse(slicedPayload)))
    } else if (slicedPayload.length < this.currentPacket.dataSizeToRead) {
      debug("readPayload need to read more data from stream")
      this.currentPacket.dataRaw += slicedPayload
      this.parserState = pureDefs.parserState.none
    } else if (slicedPayload.length > this.currentPacket.dataSizeToRead) {
      // multiple messages in this stream, read the first one and continue
      this.parserState = pureDefs.parserState.none
      debug("readPayload got all data in one read, but more data in stream")
      try {
        this.currentPacket.dataObject = JSON.parse(slicedPayload)
      } catch (syntaxError) {
        debug("can't parse payload data as JSON, %s", syntaxError)
      }

      debug("payload is a JSON object pass it to our application")
    }
  }

  portData(data) {
    debug('got data on serial state: %d data: "%s"', this.parserState, data)

    do {
      switch (this.parserState) {
        case pureDefs.parserState.none:
        case pureDefs.parserState.readingType:
          this.readType(data)
          break

        case pureDefs.parserState.readingSize:
          this.readSize(data)
          break

        case pureDefs.parserState.readingPayload:
          this.readPayload(data)
          break

        default:
          break
      }
    } while (this.parserState != pureDefs.parserState.none)

    debug("read end")
  }

  portClose(err) {
    debug("portClose %o", err)
    this.channels["close"].forEach((fn) => fn(err))
    this.isPolling = false
  }

  init(devicePath) {
    debug("using [%s] for serial port", devicePath)
    this.serialPortHandle = new SerialPort(devicePath)

    this.serialPortHandle.on("open", this.portOpen.bind(this))
    this.serialPortHandle.on("data", this.portData.bind(this))
    this.serialPortHandle.on("error", this.portError.bind(this))
    this.serialPortHandle.on("close", this.portClose.bind(this))
  }

  /*
   * deprecated do not use
   */
  getUpdateFileInfo(updateFile) {
    debug("getUpdateFileInfo %o", updateFile)
    var jsonRequest = {
      endpoint: pureDefs.enpoint.update,
      method: pureDefs.method.get,
      body: {
        fileName: path.basename(updateFile),
      },
      uuid: getNewUUID(),
    }

    var req = createValidRequest(jsonRequest)
    debug("requesting file info %s", req)
    this.serialPortHandle.write(req, function (err) {
      if (err) {
        debug("errror writing file info request message %o", err)
        this.isPolling = false
      }
    })
  }

  /*
   * get a list of update files stored on the phone,
   * at one time there can by multiple .tar files
   */
  getUpdateFiles() {
    debug("getUpdateFiles")
    var jsonRequest = {
      endpoint: pureDefs.enpoint.update,
      method: pureDefs.method.get,
      body: {
        getUpdateFiles: true,
      },
      uuid: getNewUUID(),
    }

    var req = createValidRequest(jsonRequest)
    debug("requesting update list %s", req)
    this.serialPortHandle.write(req, function (err) {
      if (err) {
        debug("errror writing update list request start message %o", err)
        this.isPolling = false
      }
    })
  }

  updateConfirmed() {
    debug("updateConfirmed")
  }

  startUpdate(updateFileFromUser) {
    console.log("start Update", updateFileFromUser)
    this.updateFile = updateFileFromUser
    this.isPolling = false
    debug("updateFile: %s", this.updateFile)

    var jsonUpdateRequest = {
      endpoint: pureDefs.enpoint.update,
      method: pureDefs.method.post,
      body: {
        fileName: path.basename(this.updateFile),
      },
      uuid: getNewUUID(),
    }

    var req = createValidRequest(jsonUpdateRequest)
    debug("requesting update: %s updateFileSize: %d", req, this.updateFileSize)
    this.serialPortHandle.write(req, function (err) {
      if (err) {
        this.isPolling = false
      }
    })
  }

  uploadUpdateFile(file) {
    this.uploadFile = {}
    this.uploadFile.path = file
    this.uploadFile.size = fs.lstatSync(file).size
    this.uploadFile.uuid = getNewUUID()
    var jsonUploadRequest = {
      endpoint: pureDefs.enpoint.filesystemUpload,
      method: pureDefs.method.post,
      body: {
        command: "download",
        fileName: path.basename(this.uploadFile.path),
        fileSize: this.uploadFile.size,
      },
      uuid: this.uploadFile.uuid,
    }
    var req = createValidRequest(jsonUploadRequest)
    debug("requesting uploadUpdateFile: %s", req)
    this.serialPortHandle.write(req, function (err) {
      if (err) {
        this.isPolling = false
        debug("can't write upload request to serial port %s", err)
      }
    })
  }

  fileUploadConfirmed() {
    debug("fileUploadConfirmed")
    clearTimeout(this.timerObject)
    this.isPolling = false
    const readStream = fs.createReadStream(this.uploadFile.path, {
      highWaterMark: 16384,
    })
    this.uploadFile.dataSent = 0
    this.uploadFile.lastWrite = 0
    this.uploadFile.startTime = Date.now()
    const data = []
    readStream.on("data", this.readFileHandler.bind(this))

    readStream.on("error", (err) => {
      debug("can't read update file %s", err)
    })

    readStream.on("end", this.readFileFinished.bind(this))
  }

  readFileHandler(data) {
    debug("readFileHandler data length:%d", data.length)
    this.serialPortHandle.write(data, function (err) {
      if (err) {
        debug("error writing to serial port %s", err)
      } else {
        debug("writing %d", data.length)
      }
    })

    this.serialPortHandle.drain()
    this.uploadFile.lastWrite = Date.now()
    this.uploadFile.dataSent += data.length

    // if (this.owner.onFileReadAsync) this.owner.onFileReadAsync(this.uploadFile)
  }

  readFileFinished() {
    this.isPolling = true
    this.timerObject = setTimeout(
      this.sendDeviceStatusRequest.bind(this),
      this.pingInterval
    )
  }

  systemReboot() {
    const uuid = getNewUUID()

    var request = createValidRequest({
      endpoint: pureDefs.enpoint.developer,
      method: pureDefs.method.get,
      uuid: uuid,
      body: { command: "reboot" },
    })

    debug('systemReset write "%s"', request)
    this.serialPortHandle.write(request, function (err) {
      if (err) {
        debug("errror writing systemReset message %o", err)
        this.isPolling = false
      }
    })
  }

  dumpLogs() {
    const uuid = getNewUUID()

    var request = createValidRequest({
      endpoint: pureDefs.enpoint.developer,
      method: pureDefs.method.get,
      uuid: uuid,
      body: { command: "logs" },
    })

    debug('dumpLogs write "%s"', request)
    this.serialPortHandle.write(request, function (err) {
      if (err) {
        debug("errror writing systemReset message %o", err)
        this.isPolling = false
      }
    })
  }

  on(channelName, fn) {
    const channel = this.channels[channelName]
    if (channel) channel.push(fn)
  }

  off(channelName, unregisterFn) {
    const channel = this.channels[channelName]
    if (channel) {
      this.channels[channelName] = channel.filter((fn) => fn === unregisterFn)
    }
  }
}

module.exports.PureNode = PureNode
module.exports.Constants = pureDefs
