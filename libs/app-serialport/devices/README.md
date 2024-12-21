# app-serialport-devices

This library contains SerialPort classes for devices supported by the Mudita Center application.

## Adding a new device

In order to add a new device, you need to:

1. Create a new class that extends the [`SerialPortDevice`](src/lib/serial-port-device.ts) class.
2. Add static properties `matchingVendorIds` and `matchingProductIds`. These properties should be arrays of strings containing the vendor and product IDs of the device.
3. Add a constructor accepting the object of [`SerialPortDeviceOptions`](src/lib/serial-port-device.ts) type that calls the parent constructor using `super` method:
   - where the first argument is the SerialPort configuration object taken from the new class constructor,
   - and the second argument is the SerialPort parser; for predefined parsers see the [SerialPort documentation](https://serialport.io/docs/api-parsers-overview).
4. Optionally, set the `requestIdKey` property to instruct the [`SerialPortDevice`](src/lib/serial-port-device.ts) class where to put a generated unique key used for identifying the requests.
   The value can be a path as defined in the [\_set](https://lodash.com/docs/4.17.15#set) method from Lodash. If not set, it defaults to `"id"`.
5. Override the `parseRequest` method to properly parse the data being sent to the device.
6. Add the new class to the `devices` array in the [`devices.ts`](src/lib/devices.ts) file.

**Example:**

```typescript
// src/lib/new-device/serial-port-new-device.ts
export class SerialPortNewDevice extends SerialPortDevice {
  static matchingVendorIds = ["abcd", "1234"]
  static matchingProductIds = ["aabb", "aabc", "1234", "4567"]

  constructor({ baudRate = 9600, ...options }: SerialPortDeviceOptions) {
    super({ baudRate, ...options }, new ApiDeviceResponseParser({ matcher: /#\d{9}/g }))
    this.requestIdKey = "rid"
  }

  parseRequest(data: ApiDeviceRequest) {
    return JSON.stringify(data)
  }
}
```

```typescript
// src/lib/devices.ts
export const devices = [SerialPortApiDevice, SerialPortNewDevice]
```

## Running unit tests

Run `nx test app-serialport-devices` to execute the unit tests via Jest.
