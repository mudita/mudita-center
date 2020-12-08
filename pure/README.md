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

### Command yargs terminal client

#### Run help to see available commands

```bash
npm run command -- --help
```

#### The example (single) request command

```bash
npm run command request '{"endpoint":1,"method":1}'
```

#### The example a sequence of requests command

```bash
npm run command requests '[{"endpoint":1,"method":1},{"endpoint":1,"method":1}]'
```

#### The example to upload file by request command (from file system)

```bash
npm run command request '{"endpoint":100,"method":1,"file":"Absolute/path/to/the/file"}'
```

#### The example to update OS by request command (from file system)

```bash
npm run command request '{"endpoint":101,"method":1,"file":"Absolute/path/to/the/file"}'
```
