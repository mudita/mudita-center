/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

declare global {
  interface NodeModule {
    hot?: {
      accept(path: string, callback: () => void): void;
    };
  }
}

export {};
