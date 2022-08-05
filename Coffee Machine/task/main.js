// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require("sync-input")

const espresso = {
  "water": 250,
  "milk": 0,
  "coffeeBeans": 16,
  "cups": 1,
  "money": 4
}
const latte = {
  "water": 350,
  "milk": 75,
  "coffeeBeans": 20,
  "cups": 1,
  "money": 7
}
const cappuccino = {
  "water": 200,
  "milk": 100,
  "coffeeBeans": 12,
  "cups": 1,
  "money": 6
}

let waterStock = 400;
let milkStock = 540;
let coffeeBeansStock = 120;
let disposableCupsStock = 9;
let moneyStock = 550;

const outputStock = () => {
  console.log(`
    The coffee machine has:
    ${waterStock} ml of water
    ${milkStock} ml of milk
    ${coffeeBeansStock} g of coffee beans
    ${disposableCupsStock} disposable cups
    $${moneyStock} of money\n
  `)
}

const buyPath = () => {
  let coffeeType = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n')

  switch (coffeeType) {
    case '1': makeCoffee(espresso); break;
    case '2': makeCoffee(latte); break;
    case '3': makeCoffee(cappuccino); break;
    default: return;
  }
}

const makeCoffee = (type) => {
  if (!checkStockForCoffeeType(type)) return;

  console.log('I have enough resources, making you a coffee!')
  waterStock -= type.water;
  milkStock -= type.milk;
  coffeeBeansStock -= type.coffeeBeans;
  disposableCupsStock -= type.cups;
  moneyStock += type.money;
}

const notifyMissingSupply = (supply) => {
  console.log(`Sorry, not enough ${supply}!`);
  return false;
}

const checkStockForCoffeeType = (type) => {
  if (waterStock < type.water) return notifyMissingSupply("water");
  if (milkStock < type.milk) return notifyMissingSupply("milk");
  if (coffeeBeansStock < type.coffeeBeans) return notifyMissingSupply("coffee beans");
  if (disposableCupsStock < type.cups) return notifyMissingSupply("cups");
  return true;

}

const fillPath = () => {
  waterStock += +input('Write how many ml of water you want to add:\n');
  milkStock += +input('Write how many ml of milk you want to add:\n');
  coffeeBeansStock += +input('Write how many grams of coffee beans you want to add:\n');
  disposableCupsStock += +input('Write how many disposable coffee cups you want to add:\n');
}

const takePath = () => {
  console.log(`I gave you $${moneyStock}`);
  moneyStock = 0;
}

while(true) {
  let path = input('Write action (buy, fill, take, remaining, exit):\n');
  switch (path) {
    case 'buy': buyPath(); break;
    case 'fill': fillPath(); break;
    case 'take': takePath(); break;
    case 'remaining': outputStock(); break;
    case 'exit': return;
    default: console.log('Undefined path selected');
  }
}