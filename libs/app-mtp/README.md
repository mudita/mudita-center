# app-mtp

# app-mtp-cli

`app-mtp-cli` is a CLI tool for interacting with MTP devices, supporting actions like retrieving devices, storages, and
uploading files.

### Example Commands

#### 1. Get Devices

```bash
npm run app-mtp:cli \'{\"action\":\"GET_DEVICE_STORAGES\", \"deviceId\":\"device123\"}\'
```

#### 2. Get Device Storages

```bash
npm run app-mtp:cli \'{\"action\":\"GET_DEVICE_STORAGES\", \"deviceId\":\"device123\"}\'
```

#### 3. Upload File

```bash
npm run app-mtp:cli \'{\"action\":\"UPLOAD_FILE\", \"deviceId\":\"device123\", \"storageId\":\"storage456\", \"destinationPath\":\"/path/to/destination\", \"sourcePath\":\"/path/to/source\"}\'
```

#### 4. Get Upload File Progress

```bash
npm run app-mtp:cli \'{\"action\":\"GET_UPLOAD_FILE_PROGRESS\", \"transactionId\":\"transaction123\"}\'
```

