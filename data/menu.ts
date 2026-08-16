export interface MenuItem {
  id: string
  category: 'Burgers' | 'Pizza' | 'Sides' | 'Drinks'
  name: string
  desc: string
  price: number
  tag?: string
  image: string
}

const IMG = {
  burger: '/images/burger.svg',
  pizza: '/images/pizza.svg',
  sides: '/images/sides.svg',
  drink: '/images/drink.svg'
}

export const menu: MenuItem[] = [
  {
    id: 'b1',
    category: 'Burgers',
    name: 'The Char Classic',
    desc: 'A double smash patty with aged cheddar, pickles, charred onion, and our house sauce on a toasted bun.',
    price: 8.5,
    tag: 'Signature',
    image: IMG.burger
  },
  {
    id: 'b2',
    category: 'Burgers',
    name: 'Smoke & Blue',
    desc: 'Chargrilled beef topped with blue cheese crumble, crispy shallots, and smoked mayo.',
    price: 9.5,
    image: IMG.burger
  },
  {
    id: 'b3',
    category: 'Burgers',
    name: 'Firecracker Chicken',
    desc: 'A buttermilk fried chicken thigh with jalapeno, chipotle glaze, and fresh slaw.',
    price: 8.9,
    tag: 'Spicy',
    image: IMG.burger
  },
  {
    id: 'b4',
    category: 'Burgers',
    name: 'Green Garden Stack',
    desc: 'Grilled portobello with basil pesto, roasted pepper, rocket, and a vegan aioli.',
    price: 7.9,
    tag: 'Veg',
    image: IMG.burger
  },
  {
    id: 'b5',
    category: 'Burgers',
    name: 'The Double Trouble',
    desc: 'Two smash patties stacked high with double cheddar, caramelized onion, and burger sauce.',
    price: 10.5,
    tag: 'For the hungry',
    image: IMG.burger
  },
  {
    id: 'b6',
    category: 'Burgers',
    name: 'BBQ Brisket Melt',
    desc: 'Slow cooked brisket with smoky barbecue sauce, melted gouda, and crispy onion straws.',
    price: 10.9,
    image: IMG.burger
  },
  {
    id: 'p1',
    category: 'Pizza',
    name: 'Margherita di Fuoco',
    desc: 'San Marzano tomato, fior di latte mozzarella, and fresh basil on our wood fired crust.',
    price: 10.5,
    image: IMG.pizza
  },
  {
    id: 'p2',
    category: 'Pizza',
    name: 'Pepperoni Char-Edge',
    desc: 'Cup and char pepperoni with mozzarella and a honey chilli drizzle.',
    price: 11.5,
    tag: 'Signature',
    image: IMG.pizza
  },
  {
    id: 'p3',
    category: 'Pizza',
    name: 'Smoked Mushroom & Truffle',
    desc: 'Wild mushroom, truffle oil, taleggio cheese, and crispy sage leaves.',
    price: 12.9,
    image: IMG.pizza
  },
  {
    id: 'p4',
    category: 'Pizza',
    name: 'Four Pepper Verde',
    desc: 'Roasted peppers, jalapeno, and green chilli with mozzarella and chilli oil.',
    price: 11.0,
    tag: 'Spicy',
    image: IMG.pizza
  },
  {
    id: 'p5',
    category: 'Pizza',
    name: 'White Garlic Pie',
    desc: 'Roasted garlic cream base with mozzarella, ricotta, and a scatter of fresh herbs.',
    price: 11.9,
    image: IMG.pizza
  },
  {
    id: 'p6',
    category: 'Pizza',
    name: 'Meat Lover\u2019s Char Pie',
    desc: 'Pepperoni, Italian sausage, and smoked bacon over a rich tomato base.',
    price: 13.5,
    tag: 'For the hungry',
    image: IMG.pizza
  },
  {
    id: 's1',
    category: 'Sides',
    name: 'Charred Corn Ribs',
    desc: 'Smoked paprika butter with lime and cotija cheese.',
    price: 4.5,
    image: IMG.sides
  },
  {
    id: 's2',
    category: 'Sides',
    name: 'Triple Cooked Fries',
    desc: 'Rosemary salt with roast garlic aioli on the side.',
    price: 3.9,
    image: IMG.sides
  },
  {
    id: 's3',
    category: 'Sides',
    name: 'Buffalo Cauliflower',
    desc: 'Crispy fried cauliflower with a buffalo glaze and blue cheese drizzle.',
    price: 4.9,
    tag: 'Veg',
    image: IMG.sides
  },
  {
    id: 's4',
    category: 'Sides',
    name: 'Loaded Cheese Fries',
    desc: 'Triple cooked fries loaded with melted cheddar, bacon bits, and spring onion.',
    price: 5.5,
    image: IMG.sides
  },
  {
    id: 's5',
    category: 'Sides',
    name: 'Sweet Potato Fries',
    desc: 'Crisped to order with a honey chipotle dip.',
    price: 4.2,
    tag: 'Veg',
    image: IMG.sides
  },
  {
    id: 'd1',
    category: 'Drinks',
    name: 'Smoked Old Fashioned Lemonade',
    desc: 'House lemonade with charred lemon and a smoked sugar rim.',
    price: 3.5,
    image: IMG.drink
  },
  {
    id: 'd2',
    category: 'Drinks',
    name: 'Craft Root Beer Float',
    desc: 'Small batch root beer poured over vanilla bean ice cream.',
    price: 3.9,
    image: IMG.drink
  },
  {
    id: 'd3',
    category: 'Drinks',
    name: 'Iced Hibiscus Tea',
    desc: 'Cold steeped hibiscus with orange peel and mint.',
    price: 3.0,
    image: IMG.drink
  },
  {
    id: 'd4',
    category: 'Drinks',
    name: 'Salted Caramel Shake',
    desc: 'Vanilla ice cream blended with salted caramel and whipped cream.',
    price: 4.5,
    image: IMG.drink
  },
  {
    id: 'd5',
    category: 'Drinks',
    name: 'Fresh Watermelon Cooler',
    desc: 'Blended watermelon with lime and a mint sprig.',
    price: 3.6,
    image: IMG.drink
  }
]

export const categories: MenuItem['category'][] = ['Burgers', 'Pizza', 'Sides', 'Drinks']
