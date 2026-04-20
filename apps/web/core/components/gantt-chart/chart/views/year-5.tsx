/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { observer } from "mobx-react";
import { cn } from "@plane/utils";
import { useTimeLineChartStore } from "@/hooks/use-timeline-chart";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../constants";
import type { IMonthBlock } from "../../views";
import { groupMonthsToYearsWithQuarters } from "../../views";

export const Year5ChartView = observer(function Year5ChartView(_props: any) {
  const { currentViewData, renderView } = useTimeLineChartStore();
  const monthBlocks: IMonthBlock[] = renderView;
  const yearBlocks = groupMonthsToYearsWithQuarters(monthBlocks);

  return (
    <div className="absolute top-0 left-0 flex h-max min-h-full w-max">
      {currentViewData &&
        yearBlocks.map((yearBlock, rootIndex) => (
          <div
            key={`year5-${yearBlock.year}`}
            className="relative flex flex-col outline-[0.25px] outline-subtle-1"
          >
            <div
              className="sticky top-0 z-[5] w-full flex-shrink-0 bg-surface-1 outline-[1px] outline-subtle-1"
              style={{ height: `${HEADER_HEIGHT}px` }}
            >
              <div className="inline-flex h-7 w-full justify-between">
                <div
                  className="sticky z-[1] my-1 flex items-center bg-surface-1 px-3 py-1 text-14 font-regular whitespace-nowrap text-secondary"
                  style={{ left: `${SIDEBAR_WIDTH}px` }}
                >
                  {yearBlock.title}
                  {yearBlock.today && (
                    <span className="ml-2 rounded-sm bg-accent-primary px-1 text-9 font-medium text-on-color">
                      Current
                    </span>
                  )}
                </div>
              </div>
              <div className="flex h-5 w-full">
                {yearBlock.children.map((qBlock, index) => (
                  <div
                    key={`qsub-${rootIndex}-${index}`}
                    className={cn(
                      "flex flex-shrink-0 justify-center text-center capitalize outline-[0.25px] outline-subtle-1",
                      { "bg-accent-primary/20": qBlock.today }
                    )}
                    style={{ width: `${currentViewData.data.dayWidth * qBlock.days}px` }}
                  >
                    <div className="flex h-full items-center justify-center text-11 font-medium">
                      <span className={cn({ "rounded-lg bg-accent-primary px-2 text-on-color": qBlock.today })}>
                        {qBlock.shortTitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-full w-full flex-grow">
              {yearBlock.children.map((qBlock, index) => (
                <div
                  key={`qcol-${rootIndex}-${index}`}
                  className={cn("h-full overflow-hidden outline-[0.25px] outline-subtle", {
                    "bg-accent-primary/20": qBlock.today,
                  })}
                  style={{ width: `${currentViewData.data.dayWidth * qBlock.days}px` }}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
});
