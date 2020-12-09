## Setup

### Install

```bash
npm install
```

## Build

```bash
npm run build
```


## How to test it?

1. First of all, write a test
2. If you would like to test in the *MC*, please build this package before run develop
3. Use command yargs terminal client

## Command yargs terminal client

### Run help to see available commands

```bash
npm run command -- --help
```

#### The request command

This command allows you to send a single request to the Pure phone.

##### The example (single) request command

As an argument you should put the stringify JSON, where the interface of this JSON (`RequestConfig`) is actual in `/pure/src/device.types.ts`

```bash
npm run command request '{"endpoint":1,"method":1}'
```

##### The example (single) request command with body

```bash
npm run command request '{"endpoint":7,"method":3,"body":{"id":1,"primaryName":"Jacek","altName":"Ziemniak","address":"Jana Czeczota 9 \n 02-607 Warszawa","numbers":["797393115"],"blocked":false,"favourite":false}}'
```

##### The example to upload file by request command (from file system)

```bash
npm run command request '{"endpoint":100,"method":1,"file":"Absolute/path/to/the/file"}'
```

##### The example to update OS by request command (from file system)

```bash
npm run command request '{"endpoint":101,"method":1,"file":"Absolute/path/to/the/file"}'
```

#### The requests command

This command allows you to send a sequence of requests to the Pure phone

```bash
npm run command requests '[{"endpoint":1,"method":1},{"endpoint":1,"method":1}]'
```
