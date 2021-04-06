# Mudita Center - Contract test

This package enables to test Mudita Pure's API directly through using `Mudita Center - Pure library`. Test mostly include snapshot test but also test that test each response types. Each tests also appends to json its response in order to use this fixture as a input data for various endpoints in fake adapters in Mudita Center app. For now, because of Pure's library limitations it's not possible to test in multiple test files, for now it has to be done in one file.

## Setup

1. Run `npm run setup` from root
2. To run test run command `npm run contract:test` from root or `npm t` from `packages/contract-test`

## Adding new tests

1. Test has to be added in `contract-test.test.ts`. Don't create a new file for tests.
2. Add test with meaningful description.
3. Use device.request method in order to call Pure's API. 

## Process 
Process is described in an external doc. Link: https://appnroll.atlassian.net/wiki/spaces/PDA/pages/1167820227/Contract+testing+process

## TODOS

- Should we clean state of phone before running tests
- Minimal/maximal test case, error case
- Test script in the main package.json
- Manual for QA
- Better tests structure
- Save real responses from device and replace applications test mocks with those fixtures
- Design the changes process
- Setup for running multiple test files
- How to exit tests
