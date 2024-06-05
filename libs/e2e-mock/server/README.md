Rozumiem, oto zaktualizowana dokumentacja uwzględniająca poprawny interfejs `MockHttpResponse`:

# e2e-mock-server

This documentation explains how to use the mock mechanism with `E2EMockClient` to test various scenarios in the application. The mock mechanism allows you to simulate different conditions of the application's operation, including device mocking, native updater behavior, and HTTP requests.

## Table of Contents

1. [Introduction](#introduction)
2. [Mocking HTTP Response](#mocking-http-response)
3. [Mock Updater State](#mock-updater-state)
4. [Usage Examples](#usage-examples)
    - [No Update Available](#no-update-available)
    - [Update Available](#update-available)
    - [Required Mudita Center Update](#required-mudita-center-update)
    - [Example Without Forced Update](#example-without-forced-update)

## Introduction

The mock mechanism allows you to simulate different aspects of the application's operation, which is especially useful during end-to-end (E2E) tests. `E2EMockClient` enables mocking at the application architecture level, including devices, native updater behavior, and HTTP requests.

## Mocking HTTP Response

To set up mocking of the HTTP response for any request, use the following command:
```javascript
E2EMockClient.mockHttpResponse({
  url: 'https://example.io/v2-app-configuration',
  method: 'GET',
  status: 200,
  data: {
    centerVersion: "3.0.0",
    productVersions: {
      MuditaHarmony: "1.0.0",
      MuditaPure: "1.0.0",
      APIDevice: "1.0.0",
    },
  },
})
```

### Parameters

- `url` (string): The URL for which you want to mock the response.
- `method` (MockHttpMethod): The HTTP method for which you want to mock the response (e.g., 'GET', 'POST').
- `response` (Partial<AxiosResponse>): The mock response object that should be returned for the given URL and method.

## Mock Updater State

The `setMockUpdateState` function is a method provided by the `E2EMockClient` to simulate different update states of the application, use the following command:

```javascript
E2EMockClient.setMockUpdateState({ available: boolean, version?: string })
```

### Parameters
- `available` (boolean): This parameter indicates whether an update is available (`true`) or not (`false`).

- `version` (string, optional): This parameter specifies the version of the update that is available. It is only required if `available` is set to `true`.

## Usage Examples

### No Update Available

To set the response indicating that no update is available, use the following command:
```javascript
E2EMockClient.setMockUpdateState({ available: false })
```

### Update Available

To set the response indicating that an update is available with a specified version, use the following command:
```javascript
E2EMockClient.setMockUpdateState({ available: true, version: "4.0.0" })
```

### Required Mudita Center Update

To set the response indicating that an update is available and a Mudita Center update is required for versions lower than 3.0.0, use the following commands:
```javascript
E2EMockClient.setMockUpdateState({ available: true, version: "4.0.0" })
E2EMockClient.mockHttpResponse({
  url: '/v2-app-configuration',
  method: 'GET',
  status: 200,
  data: {
    centerVersion: "3.0.0",
    productVersions: {
      MuditaHarmony: "1.0.0",
      MuditaPure: "1.0.0",
      APIDevice: "1.0.0",
    },
  },
})
```

### Example Without Forced Update

To set the response indicating that an update is available and the application is presented in a version above 0.0.1, use the following commands:
```javascript
E2EMockClient.setMockUpdateState({ available: true, version: "4.0.0" })
E2EMockClient.mockHttpResponse({
  url: '/v2-app-configuration',
  method: 'GET',
  status: 200,
  data: {
    centerVersion: "0.0.1",
    productVersions: {
      MuditaHarmony: "1.0.0",
      MuditaPure: "1.0.0",
      APIDevice: "1.0.0",
    },
  },
})
```
