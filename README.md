# Mudita Center

[![Follow Twitter](https://img.shields.io/twitter/follow/wearemudita?label=Follow%20on%20Twitter&style=social)](https://twitter.com/wearemudita)

[![codecov](https://codecov.io/gh/mudita/mudita-center/branch/master/graph/badge.svg?token=10F4ZOOS5S)](https://codecov.io/gh/mudita/mudita-center)

Mudita Center is written in JavaScript and distributed as an Electron app.

Mudita Center allows you to expand and update the features of Mudita Pure, while using your computer. Update [MuditaOS](https://github.com/mudita/MuditaOS/), synchronise calendar and contacts, upload audio, use Pure as a mobile hotspot. One application for every platform, open-sourced for transparency.

If you would like to help us create Mudita Center as a full-time job - **[we're hiring!](https://mudita.com/career/)**

![Mudita Center interface screenshot](./mudita-center-screenshot.png)

## Key features

- updating MuditaOS
- creating backups
- managing contacts and messages from your desktop
- enabling using Mudita Pure as a mobile hotspot
- Windows, macOS, Linux support

### Coming soon

- recovery mode
- synchronizing calendar and contacts with Google and Apple
- managing notes and events from your desktop
- uploading audio files
- managing files
- viewing meditation stats

## Table of contents

- [Mudita Center](#mudita-center)
  - [Key features](#key-features)
  - [Table of contents](#table-of-contents)
  - [Quickstart](#quickstart)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
    - [Discussions](#discussions)
    - [Reporting bugs and feature requests](#reporting-bugs-and-feature-requests)
    - [Development workflow](#development-workflow)
  - [Changelog](#changelog)
  - [License](#license)
  - [Hiding sensitive data](#hiding-sensitive-data)
  - [Services](#services)

## Quickstart

You can quickstart the project by going through the ["Quickstart" article](./quickstart.md).

## Scripts

Take a look at the list of available npm [Scripts](./SCRIPTS.md).

## Contributing

Pull requests are welcome. Please follow the guidelines in the ["Contributing to Mudita Center"](./CONTRIBUTING.md) article. Before contributing or starting a discussion, please make sure that you read our [Code of Conduct](./CODE_OF_CONDUCT.md).

### Discussions

For general questions and ideas regarding Mudita Center please post in the [“Mudita Products” section on Mudita Forum](https://forum.mudita.com/c/mudita-products/). Please explore all existing posts to make sure you’re not posting about an issue that has already been discussed.

### Reporting bugs and feature requests

You can report bugs and feature requests on [GitHub](https://github.com/Mudita/mudita-center/issues). This is also a good place to discuss architecture decisions and things that aren’t yet covered by the documentation. Please refer to the ["Contributing to Mudita Center"](./CONTRIBUTING.md) article for more details.

### Development workflow

When contributing code or documentation changes please follow the guidelines inside the ["Development workflow"](./development_workflow.md) article.

## Changelog

The [Mudita Center changelog](https://github.com/Mudita/mudita-center/releases) is regularly updated by the core development team.

## License

Mudita Center is licensed under [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/).

## Hiding sensitive data

As a Mudita we take care of the security of your data. All data we are collecting are hidden. If you will add a new query in request path, that contains sensitive data, you need to add it to scrubFields array in logger.ts

## Services

You'll need access to the following services in order to develop the app.

| Service | Description                                       | URL                 |
| ------- | ------------------------------------------------- | ------------------- |
| Codecov | Code coverage reporter and static code validator. | https://codecov.io/ |
