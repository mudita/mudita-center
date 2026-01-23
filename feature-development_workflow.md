# Feature development workflow

This document explains the feature development workflow for Mudita Center.
It is intended to help contributors understand the process of adding new features
and acknowledge the best practices to follow.

## Base structure

The repo is built in a monorepo structure using [Nx](https://nx.dev/) as a build tool.
The main application code is located in the `apps` directory, while shared libraries
and components are located in the `libs` directory.

Other directories (`/patches`, `/resources`, `/scripts`) are used for development and build purposes,
containing scripts not related directly to the application code.

### Apps

This is where different applications are located along with their specific configurations.
They should be kept minimal, delegating most of the logic to the libraries in the `libs` directory.

- `apps/app` - here are the main Electron application code and Electron-specific configurations,
- `apps/app-e2e` - directory where end-to-end tests are located,
- `apps/web` - initial React setup and Storybook configuration.

### Libraries

This is the core of the Mudita Center codebase where most of the development happens.
Each library corresponds to a specific feature or a set of related features.

Each library is an Nx generated React library with its own isolated environment,
including Jest for unit testing, ESLint for linting, and TypeScript for type checking.

Generating a new library can be done by simply running a Nx generator command:

```bash
nx g @nx/react:library --directory=libs/<lib_name>/<directory> --name=<lib_name>/<directory> --unitTestRunner=jest --tags=<lib_tag> --no-interactive
```

This will generate a new library in the `libs/<lib_name>/<directory>` directory and the import
declaration for it will be as following:

```ts
import { something } from "<lib_name>/<directory>"
```

You can read more about Nx generators [in the official documentation](https://nx.dev/docs/technologies/react/generators),
however, before proceeding to create a new library, please read this entire article
to understand the Mudita Center library structure and conventions.

## Library mental model

Library is a building block of the Mudita Center codebase. It encapsulates specific
features, UI components, or utility functions, promoting code reusability and maintainability.

Nx helps to maintain clear boundaries between different libraries, enforcing dependency rules
and ensuring that libraries do not inadvertently depend on each other in an undesired way.

This is done mostly via tags assigned to each library (but developer's caution is still required).
Tags are used to define the purpose and scope of each library, and to enforce architectural rules.
For example, a `ui` library should not depend on a `feature` library, while the opposite is allowed.

You can read more about the general idea of tags and rules in the
[Nx documentation](https://nx.dev/docs/features/enforce-module-boundaries).

### Rules

Tags rules are defined in the [eslint configuration](./eslint.config.js) under the
`@nrwl/nx/enforce-module-boundaries` section. For better understanding, here is a breakdown
of all the tags used in the Mudita Center codebase:

- `type:models`

  Libraries of this type should contain only data models, types, and interfaces. This helps to keep
  the data structures consistent across the codebase and allows other libraries to depend on them
  without a risk of circular dependencies.

  > They can depend only on other `type:models` libraries.

- `type:utils`

  Libraries of this type should contain utility functions and helpers that can be used across
  different libraries within the same domain. These libraries should not contain any UI components
  or business logic.

  > They can depend only on `type:models` and other `type:utils` libraries.

- `type:ui`

      Libraries of this type should contain reusable UI components that can be used across different

  features, preferably within the same domain. These libraries should not contain any business logic.

      >   They can depend on `type:models`, `type:utils` and other `type:ui` libraries.

- `process:renderer`

      Libraries of this type are intended to be used only in the renderer process of the Electron app.

  They can contain UI components, business logic, and other code that runs in the renderer process.

      > They can depend on any library except `process:main` libraries.

- `process:main`

      Libraries of this type are intended to be used only in the main process of the Electron app.

  They can contain business logic, services, and other code that runs in the main process.

      > They can depend only on `type:models`, `type:utils` and other `process:main` libraries

## Creating a new library

The aftermentioned Nx generator command can be used to create any kind of library:

```bash
nx g @nx/react:library --directory=libs/<lib_name>/<lib_type> --name=<lib_name>/<lib_type> --unitTestRunner=jest --tags=<lib_tag> --no-interactive
# or
nx g @nx/react:library --directory=libs/<lib_subdirectory>/<lib_name>/<lib_type> --name=<lib_subdirectory>/<lib_name>/<lib_type> --unitTestRunner=jest --tags=<lib_tag> --no-interactive
```

**Note:** you can apply a `--dry-run` flag at the end of the command to see what files would
be created without actually creating them.

However, for convenience, a custom npm script is provided to simplify the process
of creating most common library types used in the Mudita Center codebase:

```bash
npm run lib:create n=<lib_name> t=<lib_type> d=<lib_subdirectory>
```

Where:

- `<lib_name>` is the name of the library (domain) to be created,
- `<lib_type>` is the type of the library to be created
  (see [Available library types](#available-library-types) section),
- `<lib_subdirectory>` (optional) is the subdirectory inside `libs/` where the library should be created.

  If not provided, the library will be created directly inside the `libs/` directory,

  but when provided, omit the `libs/` prefix as it will be automatically added by the script.
  This ensures that all libraries are always created inside the `libs/` directory.

**Note:** You can use either the short (`n`, `t`, `d`) or the long (`name`, `type`, `directory`)
names for the parameters.

### Available library types

The following library types are available via the `npm run lib:create` script:

- `models` - same as `type:models` described in [Rules](#rules),
- `utils` - same as `type:utils` described in [Rules](#rules),
- `ui` - same as `type:ui` described in [Rules](#rules),
- `routes` - a special type of library that should contain `react-router` routes definitions
  and related components; it is tagged as `process:renderer`,
- `feature` - a special type of library that combines other libraries to create a complete feature,
  often utilizing business logic; it is tagged as `process:renderer`,
- `renderer` - a kind of library that is mostly used for exposing the Electron's context bridge
  to the renderer process; it is tagged as `process:renderer`,
  but can also contain other renderer process code that doesn't fit into other library types.
- `main` - a kind of library that is intended to contain main process code,
  mostly services and its initialization; it is tagged as `process:main`.

These are the most common library types used in the Mudita Center codebase so please try to
fit your new library into one of these types before deciding to use the `nx g` command directly.

### Example

As an example, the following commands will create three different libraries, but within the same `auth` domain:

```bash
npm run lib:create n=auth t=feature
npm run lib:create n=auth type=ui
npm run lib:create name=auth type=utils
```

This will result in creating the following directory structure:

```libs/
libs/
`-- auth/
    |
    |-- feature/
    |   |-- src/
    |   |   |-- lib/
    |   |   `-- index.ts
    |   |-- jest.config.ts
    |   |-- tsconfig.lib.json
    |   `-- ...
    |
    |-- ui/
    |   |-- src/
    |   |   |-- lib/
    |   |   `-- index.ts
    |   |-- jest.config.ts
    |   |-- tsconfig.lib.json
    |   `-- ...
    |
    `-- utils/
        |-- src/
        |   |-- lib/
        |   `-- index.ts
        |-- jest.config.ts
        |-- tsconfig.lib.json
        `-- ...
```

It will also update the `tsconfig.base.json` file to include path mappings for the newly created libraries.

This way, you can easily import the libraries elsewhere\* in the codebase like this:

```typescript
import { SomeFeature } from "auth/feature"
import { SomeComponent } from "auth/ui"
import { someUtil } from "auth/utils"
```

\* respecting the dependency rules described in the [Rules](#rules) section.

From now on, you can start writing a code inside the `src/lib/` directory of a given library
and eventually export public API via the `src/index.ts` file of that library.

## Linting and testing

As each library comes with its own ESLint and Jest configurations, you can run linting and testing
for a specific library by using the following commands:

```bash
# lint
nx lint <lib_name>/<lib_type>

# typecheck
nx typecheck <lib_name>/<lib_type>

# jest
nx test <lib_name>/<lib_type>
```

### Example

Continuing with the previous example of the `auth` libraries, you can run linting, type checking, and testing for the `auth/ui` library like this:

```bash
nx lint auth/ui
nx typecheck auth/ui
nx test auth/ui
```

Or you can run these commands for all `auth` libraries at once by using the following command:

```bash
nx run-many --target=lint,typecheck,test --projects=auth/feature,auth/ui,auth/utils
```
