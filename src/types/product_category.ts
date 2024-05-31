const ProductCategories = {
  ANIMES: 1,
  GAMES: 2,
  CUTE: 3,
  RELIGIOUS: 4,
  PLUSHIES: 5,
  GEEK: 6,
  PRINCESS: 7,
  HEROES: 8,
} as const;

export type ProductCategoriesTypes = keyof typeof ProductCategories;
