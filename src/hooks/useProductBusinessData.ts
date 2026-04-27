import { useMemo, useState } from "react";
import {
  PRODUCT_FILTER_MONTHS_BY_YEAR,
  PRODUCT_FILTER_YEARS,
  PRODUCT_SERIES_OPTIONS,
} from "../mock/productBusiness";
import { deriveProductBusinessData } from "../services/productBusinessService";

export function useProductBusinessData() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("09");
  const [selectedSeries, setSelectedSeries] = useState<string[]>([...PRODUCT_SERIES_OPTIONS]);

  const derivedData = useMemo(
    () => deriveProductBusinessData({ selectedYear, selectedMonth, selectedSeries }),
    [selectedYear, selectedMonth, selectedSeries],
  );

  const toggleSeries = (series: string) => {
    setSelectedSeries((previous) =>
      previous.includes(series) ? previous.filter((item) => item !== series) : [...previous, series],
    );
  };

  return {
    selectedYear,
    selectedMonth,
    selectedSeries,
    seriesOptions: [...PRODUCT_SERIES_OPTIONS],
    years: [...PRODUCT_FILTER_YEARS],
    monthsByYear: PRODUCT_FILTER_MONTHS_BY_YEAR,
    derivedData,
    setSelectedYear,
    setSelectedMonth,
    toggleSeries,
  };
}
