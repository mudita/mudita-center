# Why this module was added?

Importing `@mudita/pure` package to the project and using it with ts-node (that is used by WDIO) causes unexpected problems (`Error [ERR_REQUIRE_ESM]: Must use import to load ES Module:`), mainly by `p-queue` (it uses ESM modules) . One of the solutions to this problem is to downgrade the lib, which is not the best, the other is to adjust the tsconfig/package.json configuration.

To not waste time, the required code from `@mudita/pure` was just copied to this folder, as it is only few types and one class. If you have time or knowledge, feel free to fix this problem and adjust necessary changes (related task: https://appnroll.atlassian.net/browse/CP-1572).