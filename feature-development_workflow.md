# Feature development workflow

## About

This document explains the feature development workflow for Mudita Center. 
It is intended to help contributors understand the process of adding new features and acknowledge the best practices to follow.

## Base structure

The repo is built in a monorepo structure using [Nx](https://nx.dev/) as a build tool. 
The main application code is located in the `apps` directory, while shared libraries and components are located in the `libs` directory.

Other directories (`patches`, `resources`, `scripts`) are used for development and build purposes, 
containing scripts not related directly to the application code.

#### Apps:

- `apps/app` - here are the main Electron application code and Electron-specific configurations,
- `apps/app-e2e` - directory where end-to-end tests are located,
- `apps/web` - initial React setup and Storybook configuration.

#### Libs:

This is the core of the Mudita Center codebase where most of the development happens. 
Each library corresponds to a specific feature or a set of related features. 

- 
