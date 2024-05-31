const SortBy = {
  BEST_SELLING: 1,
  NEWS: 2,
  PRICE_ASCENDING: 3,
  PRICE_DESCENDING: 4,
} as const;

export type SortByTypes = keyof typeof SortBy;
