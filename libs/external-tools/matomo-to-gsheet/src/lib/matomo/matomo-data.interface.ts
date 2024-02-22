/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface MatomoEvent {
  label: string;
  nb_uniq_visitors: number;
  nb_visits: number;
  nb_events: number;
  nb_events_with_value: number;
  sum_event_value: number;
  min_event_value: boolean | number;
  max_event_value: number;
  avg_event_value: number;
  segment: string;
  idsubdatatable?: string;
}

  export type MatomoData = { [date: string]: MatomoEvent[] };

export interface FetchDataOptions {
  label: string
  startDate: string
  endDate: string
}

export interface GetActionEventsOptions {
  date: string
  label: string
}

export interface GetCategoryEventByLabelOptions {
  date: string
  label: string
}

export interface GetActionEventsByCategoryIdOptions {
  date: string
  id: string
}
