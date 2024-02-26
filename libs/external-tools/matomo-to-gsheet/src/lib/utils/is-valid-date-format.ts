/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Validates if a given date string is in the format YYYY-MM-DD.
 * @param dateString The date string to validate.
 * @returns true if the dateString is in the format YYYY-MM-DD, otherwise false.
 */
function isValidDateFormat(dateString: string): boolean {
  // Regular expression to match the YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the dateString matches the regular expression
  if (!regex.test(dateString)) {
    return false;
  }

  // Further validation to ensure the date is valid (e.g., not 2022-02-30)
  const date = new Date(dateString);
  const dateNum = date.getTime();

  // Check if date is Invalid Date or the dateString does not match the date's toISOString() substring
  if (!dateNum && dateNum !== 0 || dateString !== date.toISOString().substring(0, 10)) {
    return false;
  }

  return true;
}

export default isValidDateFormat
