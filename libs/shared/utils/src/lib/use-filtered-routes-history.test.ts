/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useRoutesHistory } from './routes-history.context';
import { useFilteredRoutesHistory } from "./use-filtered-routes-history"

jest.mock("./routes-history.context")

describe('useFilteredRoutesHistory', () => {
  test('returns filtered routes without cutoffRoute', () => {
    (useRoutesHistory as jest.Mock).mockReturnValue(['home', 'dashboard', 'profile']);
    const result = useFilteredRoutesHistory(['home']);
    expect(result).toEqual(['dashboard', 'profile']);
  });

  test('returns routes up to and including cutoffRoute', () => {
    (useRoutesHistory as jest.Mock).mockReturnValue(['home', 'dashboard', 'profile']);
    const result = useFilteredRoutesHistory([], 'dashboard');
    expect(result).toEqual(['home', 'dashboard']);
  });

  test('returns filtered routes up to and including cutoffRoute', () => {
    (useRoutesHistory as jest.Mock).mockReturnValue(['home', 'dashboard', 'profile', 'settings']);
    const result = useFilteredRoutesHistory(['home'], 'profile');
    expect(result).toEqual(['dashboard', 'profile']);
  });

  test('returns filtered routes when cutoffRoute is not found', () => {
    (useRoutesHistory as jest.Mock).mockReturnValue(['home', 'dashboard', 'profile']);
    const result = useFilteredRoutesHistory(['home'], 'settings');
    expect(result).toEqual(['dashboard', 'profile']);
  });

  test('returns all routes when filters are empty and no cutoffRoute', () => {
    (useRoutesHistory as jest.Mock).mockReturnValue(['home', 'dashboard', 'profile']);
    const result = useFilteredRoutesHistory([]);
    expect(result).toEqual(['home', 'dashboard', 'profile']);
  });

  test('handles empty routes list', () => {
    (useRoutesHistory as jest.Mock).mockReturnValue([]);
    const result = useFilteredRoutesHistory(['home'], 'dashboard');
    expect(result).toEqual([]);
  });

  test('handles empty routes list without filters and cutoffRoute', () => {
    (useRoutesHistory as jest.Mock).mockReturnValue([]);
    const result = useFilteredRoutesHistory([]);
    expect(result).toEqual([]);
  });

  test('returns routes up to the first occurrence of cutoffRoute', () => {
    (useRoutesHistory as jest.Mock).mockReturnValue(['3', '1', '2', '3', '4', '5', '6', '3', '7', '8']);
    const result = useFilteredRoutesHistory([], '3');
    expect(result).toEqual(['3']);
  });
});
