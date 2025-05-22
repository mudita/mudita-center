/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Creates a promise that resolves after a specified delay.
 *
 * @param {number} [ms=500] The delay in milliseconds.
 * @param  {AbortSignal} [signal] Optional AbortSignal to cancel the delay
 * @returns {Promise<void>} A promise that resolves after the delay.
 */

export const delay = (
  ms: number = 500,
  signal?: AbortSignal
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      resolve();
      return
    }

    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      console.log('Delay aborted');
      clearTimeout(timer);
      cleanup();
      resolve();
    };

    const cleanup = () => {
      signal?.removeEventListener('abort', onAbort);
    };

    signal?.addEventListener('abort', onAbort);
  });
};
