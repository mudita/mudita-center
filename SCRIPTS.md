# Scripts manual

## About

This document explains different scripts available in the `package.json`.
It's split by the package and the root repo.

## Projects

### Root

#### setup

Used to set up the project locally. Does both `npm install` and `lerna bootstrap` for you.
When you start the project, it's the call you want to run.

#### boostrap:local

Bootstraps the packages locally for use with Lerna. It's the dev time task only.

#### bootstrap:ci

The CI bootstrap routine. USed for GitHub workflows.

#### bootstrap:netlify

The Netlify bootstrap routine. Only for Netlify's need.
