/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { ChartDataType } from "@plane/types";
import { quarters } from "../data";
import { getNumberOfDaysBetweenTwoDates } from "./helpers";
import type { IMonthBlock } from "./month-view";
import { getMonthsBetweenTwoDates } from "./month-view";

export interface IYearMonthBlock {
  children: IMonthBlock[];
  year: number;
  title: string;
  shortTitle: string;
  today: boolean;
}

export interface IYearQuarterBlock {
  children: IMonthBlock[];
  quarterNumber: number;
  shortTitle: string;
  title: string;
  days: number;
  today: boolean;
}

export interface IYearBlock {
  children: IYearQuarterBlock[];
  year: number;
  title: string;
  shortTitle: string;
  today: boolean;
  days: number;
}

const generateYearChartData = (
  payload: ChartDataType,
  side: null | "left" | "right",
  targetDate?: Date
) => {
  let renderState = payload;
  const range: number = renderState.data.approxFilterRange || 60;
  let filteredDates: IMonthBlock[] = [];
  let startDate = new Date();
  let endDate = new Date();

  if (side === null) {
    const currentDate = renderState.data.currentDate;
    const minusDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - range, 1);
    const plusDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + range, 0);
    filteredDates = getMonthsBetweenTwoDates(minusDate, plusDate);
    const start = filteredDates[0];
    const end = filteredDates[filteredDates.length - 1];
    startDate = new Date(start.year, start.month, 1);
    endDate = new Date(end.year, end.month + 1, 0);
    renderState = { ...renderState, data: { ...renderState.data, startDate, endDate } };
  } else if (side === "left") {
    const chartStartDate = renderState.data.startDate;
    const currentDate = targetDate ?? chartStartDate;
    const minusDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - range / 2, 1);
    const plusDate = new Date(chartStartDate.getFullYear(), chartStartDate.getMonth() - 1, 1);
    filteredDates = getMonthsBetweenTwoDates(minusDate, plusDate);
    const start = filteredDates[0];
    startDate = new Date(start.year, start.month, 1);
    endDate = new Date(chartStartDate.getFullYear(), chartStartDate.getMonth(), chartStartDate.getDate() - 1);
    renderState = { ...renderState, data: { ...renderState.data, startDate } };
  } else if (side === "right") {
    const chartEndDate = renderState.data.endDate;
    const currentDate = targetDate ?? chartEndDate;
    const minusDate = new Date(chartEndDate.getFullYear(), chartEndDate.getMonth() + 1, 1);
    const plusDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + range / 2, 1);
    filteredDates = getMonthsBetweenTwoDates(minusDate, plusDate);
    const end = filteredDates[filteredDates.length - 1];
    startDate = new Date(chartEndDate.getFullYear(), chartEndDate.getMonth(), chartEndDate.getDate() + 1);
    endDate = new Date(end.year, end.month + 1, 0);
    renderState = { ...renderState, data: { ...renderState.data, endDate } };
  }

  const days = Math.abs(getNumberOfDaysBetweenTwoDates(startDate, endDate)) + 1;
  const scrollWidth = days * payload.data.dayWidth;
  return { state: renderState, payload: filteredDates, scrollWidth };
};

export const groupMonthsToYears = (monthBlocks: IMonthBlock[]): IYearMonthBlock[] => {
  const map: Record<number, IYearMonthBlock> = {};
  const todayYear = new Date().getFullYear();
  for (const block of monthBlocks) {
    if (!map[block.year]) {
      map[block.year] = {
        children: [],
        year: block.year,
        title: String(block.year),
        shortTitle: String(block.year).slice(2),
        today: block.year === todayYear,
      };
    }
    map[block.year].children.push(block);
  }
  return Object.values(map);
};

export const groupMonthsToYearsWithQuarters = (monthBlocks: IMonthBlock[]): IYearBlock[] => {
  const yearMap: Record<number, IYearBlock> = {};
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayQuarter = Math.floor(today.getMonth() / 3);

  for (const block of monthBlocks) {
    const { year, month, days } = block;
    const quarterNumber = Math.floor(month / 3);
    const quarterKey = `Q${quarterNumber}-${year}`;

    if (!yearMap[year]) {
      yearMap[year] = {
        children: [],
        year,
        title: String(year),
        shortTitle: String(year).slice(2),
        today: year === todayYear,
        days: 0,
      };
    }

    const yearBlock = yearMap[year];
    const existingQ = yearBlock.children.find(q => q.title === quarterKey);
    if (existingQ) {
      existingQ.children.push(block);
      existingQ.days += days;
    } else {
      yearBlock.children.push({
        children: [block],
        quarterNumber,
        shortTitle: quarters[quarterNumber].shortTitle,
        title: quarterKey,
        days,
        today: year === todayYear && quarterNumber === todayQuarter,
      });
    }
    yearBlock.days += days;
  }
  return Object.values(yearMap);
};

const mergeYearRenderPayloads = (a: IMonthBlock[], b: IMonthBlock[]) => [...a, ...b];

export const yearView = {
  generateChart: generateYearChartData,
  mergeRenderPayloads: mergeYearRenderPayloads,
};

export const year5View = {
  generateChart: generateYearChartData,
  mergeRenderPayloads: mergeYearRenderPayloads,
};
