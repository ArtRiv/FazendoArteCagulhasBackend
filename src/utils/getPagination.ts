export function getPagination(page) {
  const DEFAULT_TAKE = 16;

  const take = DEFAULT_TAKE;
  const skip = (page - 1) * DEFAULT_TAKE;

  return {
    take,
    skip,
  };
}
