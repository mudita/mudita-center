/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Creates a promise that resolves after a specified delay.
 *
 * @param {number} ms The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
