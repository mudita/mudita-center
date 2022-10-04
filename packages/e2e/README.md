# `@mudita/mudita-center-e2e`

The E2E testing for Mudita Center application

## Usage

`npm run test`

# Setup info

https://appnroll.atlassian.net/wiki/spaces/CP/pages/1681096705/E2E+test+environment+setup+execution+guide+v2

# Data seeding

### What is data seeding?

Adding data (contacts etc.) to the phone in order to execute tests under particular conditions.

### Technical issues

- We cannot seed the data when the MC application is already running (the SerialPort connection can be opened once - the application uses it to communicate with the phone).
- It is impossible to seed data in Mocha hooks that are defined on the test level (`before`, `beforeEach` etc.) - those hooks are executed while the MC application is already running.
- Seeding messages is a problematic matter - we cannot add them easily because it might send the messages to real people. This issue should be solved in a different way.

To solve above problems, `wdio` hooks `beforeSession` and `afterSession` are used to add data to the phone and remove it after executing all tests from the file.

### How to seed data for particular tests?

Open `resolve-seed-data.ts` and follow the pattern to add data for tests.
