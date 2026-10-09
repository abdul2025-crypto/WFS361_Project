import burger from "./assets/item-burger.jpg";
import boerie from "./assets/item-boerie.jpg";
import samoosa from "./assets/item-samoosa.jpg";
import drink from "./assets/item-drink.jpg";
import muffin from "./assets/item-muffin.jpg";
import wrap from "./assets/item-wrap.jpg";
import coffee from "./assets/item-coffee.jpg";
import chips from "./assets/item-chips.jpg";

export const menu = [
  { id: "burger", name: "BC Cheeseburger", description: "Flame-grilled beef patty, cheddar and campus relish in a toasted bun.", price: 54.9, category: "meals", image: burger, badge: "POPULAR" },
  { id: "boerie", name: "Boerie Roll", description: "Grilled boerewors with tomato-onion relish on a soft roll.", price: 42.5, category: "meals", image: boerie },
  { id: "wrap", name: "Chicken Mayo Wrap", description: "Shredded chicken, crisp lettuce and mayo in a warm tortilla.", price: 46, category: "meals", image: wrap, badge: "NEW" },
  { id: "samoosa", name: "Samoosas (3)", description: "Crispy pastry triangles with spiced mince or potato filling.", price: 24, category: "snacks", image: samoosa },
  { id: "muffin", name: "Fresh Muffin", description: "Bakery muffin of the day — chocolate or blueberry.", price: 19.5, category: "snacks", image: muffin },
  { id: "chips", name: "Chips & Chocolate", description: "A bag of chips plus a chocolate slab for the long lectures.", price: 32, category: "snacks", image: chips },
  { id: "drink", name: "Ice Cold Can", description: "330ml cold soft drink.", price: 16, category: "drinks", image: drink },
  { id: "coffee", name: "Campus Cappuccino", description: "Fresh cappuccino with steamed milk.", price: 27.5, category: "drinks", image: coffee, badge: "BARISTA" },
];

export const locations = [
  "Main Campus Residence",
  "West Campus Residence",
  "East Campus Residence",
  "South Campus Residence",
  "Library",
  "Lecturer Offices",
  "Sports Field",
];

export function money(price) {
  return `R ${price.toFixed(2).replace(".", ",")}`;
}
