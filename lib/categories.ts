export const DISH_CATEGORIES = [
  { label: "Rice", id: "rice" },
  { label: "Curry", id: "curry" },
  { label: "Snacks", id: "snacks" },
  { label: "Desserts", id: "desserts" },
  { label: "Drinks", id: "drinks" },
  { label: "Street Food", id: "street-food" }
] as const;

export const CATEGORY_LABELS = DISH_CATEGORIES.map((c) => c.label) as string[];
