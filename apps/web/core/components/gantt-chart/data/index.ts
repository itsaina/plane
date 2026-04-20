/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { ChartDataType } from "@plane/types";

export * from "./utils";

export const weeks = [
  { key: 0, shortTitle: "Sun", title: "Sunday", abbreviation: "Su" },
  { key: 1, shortTitle: "Mon", title: "Monday", abbreviation: "Mo" },
  { key: 2, shortTitle: "Tue", title: "Tuesday", abbreviation: "Tu" },
  { key: 3, shortTitle: "Wed", title: "Wednesday", abbreviation: "We" },
  { key: 4, shortTitle: "Thu", title: "Thursday", abbreviation: "Th" },
  { key: 5, shortTitle: "Fri", title: "Friday", abbreviation: "Fr" },
  { key: 6, shortTitle: "Sat", title: "Saturday", abbreviation: "Sa" },
];

export const months = [
  { key: 0, shortTitle: "Jan", title: "January", abbreviation: "Ja" },
  { key: 1, shortTitle: "Feb", title: "February", abbreviation: "Fe" },
  { key: 2, shortTitle: "Mar", title: "March", abbreviation: "Mr" },
  { key: 3, shortTitle: "Apr", title: "April", abbreviation: "Ap" },
  { key: 4, shortTitle: "May", title: "May", abbreviation: "My" },
  { key: 5, shortTitle: "Jun", title: "June", abbreviation: "Jn" },
  { key: 6, shortTitle: "Jul", title: "July", abbreviation: "Jl" },
  { key: 7, shortTitle: "Aug", title: "August", abbreviation: "Au" },
  { key: 8, shortTitle: "Sep", title: "September", abbreviation: "Se" },
  { key: 9, shortTitle: "Oct", title: "October", abbreviation: "Oc" },
  { key: 10, shortTitle: "Nov", title: "November", abbreviation: "No" },
  { key: 11, shortTitle: "Dec", title: "December", abbreviation: "De" },
];

export const quarters = [
  { key: 0, shortTitle: "Q1", title: "Q1" },
  { key: 1, shortTitle: "Q2", title: "Q2" },
  { key: 2, shortTitle: "Q3", title: "Q3" },
  { key: 3, shortTitle: "Q4", title: "Q4" },
];

export const VIEWS_LIST: ChartDataType[] = [
  {
    key: "week",
    i18n_title: "common.week",
    data: {
      startDate: new Date(),
      currentDate: new Date(),
      endDate: new Date(),
      approxFilterRange: 4,
      dayWidth: 60,
    },
  },
  {
    key: "month",
    i18n_title: "common.month",
    data: {
      startDate: new Date(),
      currentDate: new Date(),
      endDate: new Date(),
      approxFilterRange: 6,
      dayWidth: 20,
    },
  },
  {
    key: "quarter",
    i18n_title: "common.quarter",
    data: {
      startDate: new Date(),
      currentDate: new Date(),
      endDate: new Date(),
      approxFilterRange: 24,
      dayWidth: 5,
    },
  },
  {
    key: "year",
    i18n_title: "common.year",
    data: {
      startDate: new Date(),
      currentDate: new Date(),
      endDate: new Date(),
      approxFilterRange: 60,
      dayWidth: 2,
    },
  },
  {
    key: "year_5",
    i18n_title: "common.year_5",
    data: {
      startDate: new Date(),
      currentDate: new Date(),
      endDate: new Date(),
      approxFilterRange: 365,
      dayWidth: 0.5,
    },
  },
];

export const currentViewDataWithView = (view: import("@plane/types").TGanttViews = "month") =>
  VIEWS_LIST.find((v) => v.key === view);
