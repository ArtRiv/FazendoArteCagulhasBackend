const ProductCategories = {
  ALL: 1,
  ANIMES: 2,
  GAMES: 3,
  CUTE: 4,
  RELIGIOUS: 5,
  PLUSHIES: 6,
  GEEK: 7,
  PRINCESS: 8,
  HEROES: 9,
} as const;

export type ProductCategoriesTypes = keyof typeof ProductCategories;
