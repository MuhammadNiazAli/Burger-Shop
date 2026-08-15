export interface MenuItem {
  id: string
  category: 'Burgers' | 'Pizza' | 'Sides' | 'Drinks'
  name: string
  desc: string
  price: number
  tag?: string
}

export const menu: MenuItem[] = [
  {
    id: 'b1',
    category: 'Burgers',
    name: 'The Char Classic',
    desc: 'Double smash patty, aged cheddar, pickles, char-onion, house sauce.',
    price: 8.5,
    tag: 'Signature'
  },
  {
    id: 'b2',
    category: 'Burgers',
    name: 'Smoke & Blue',
    desc: 'Chargrilled beef, blue cheese crumble, crispy shallots, smoked mayo.',
    price: 9.5
  },
  {
    id: 'b3',
    category: 'Burgers',
    name: 'Firecracker Chicken',
    desc: 'Buttermilk-fried thigh, jalapeno, chipotle glaze, slaw.',
    price: 8.9,
    tag: 'Spicy'
  },
  {
    id: 'b4',
    category: 'Burgers',
    name: 'Green Garden Stack',
    desc: 'Grilled portobello, basil pesto, roasted pepper, rocket, vegan aioli.',
    price: 7.9,
    tag: 'Veg'
  },
  {
    id: 'p1',
    category: 'Pizza',
    name: 'Margherita di Fuoco',
    desc: 'San Marzano tomato, fior di latte, basil, wood-fired crust.',
    price: 10.5
  },
  {
    id: 'p2',
    category: 'Pizza',
    name: 'Pepperoni Char-Edge',
    desc: 'Cup-and-char pepperoni, mozzarella, honey chilli drizzle.',
    price: 11.5,
    tag: 'Signature'
  },
  {
    id: 'p3',
    category: 'Pizza',
    name: 'Smoked Mushroom & Truffle',
    desc: 'Wild mushroom, truffle oil, taleggio, crispy sage.',
    price: 12.9
  },
  {
    id: 'p4',
    category: 'Pizza',
    name: 'Four Pepper Verde',
    desc: 'Roasted peppers, jalapeno, green chilli, mozzarella, chilli oil.',
    price: 11.0,
    tag: 'Spicy'
  },
  {
    id: 's1',
    category: 'Sides',
    name: 'Charred Corn Ribs',
    desc: 'Smoked paprika butter, lime, cotija cheese.',
    price: 4.5
  },
  {
    id: 's2',
    category: 'Sides',
    name: 'Triple-Cooked Fries',
    desc: 'Rosemary salt, roast garlic aioli.',
    price: 3.9
  },
  {
    id: 's3',
    category: 'Sides',
    name: 'Buffalo Cauliflower',
    desc: 'Crispy fried, buffalo glaze, blue cheese drizzle.',
    price: 4.9,
    tag: 'Veg'
  },
  {
    id: 'd1',
    category: 'Drinks',
    name: 'Smoked Old Fashioned Lemonade',
    desc: 'House lemonade, charred lemon, smoked sugar rim.',
    price: 3.5
  },
  {
    id: 'd2',
    category: 'Drinks',
    name: 'Craft Root Beer Float',
    desc: 'Small-batch root beer, vanilla bean ice cream.',
    price: 3.9
  },
  {
    id: 'd3',
    category: 'Drinks',
    name: 'Iced Hibiscus Tea',
    desc: 'Cold-steeped hibiscus, orange peel, mint.',
    price: 3.0
  }
]

export const categories: MenuItem['category'][] = ['Burgers', 'Pizza', 'Sides', 'Drinks']
