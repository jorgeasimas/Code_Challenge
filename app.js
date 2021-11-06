const data = [
  {
    id: 1,
    description: "book",
    price: 12.49,
    type: "book/food/med",
    origin: "national",
  },
  {
    id: 2,
    description: "music CD",
    price: 14.99,
    type: "misc",
    origin: "national",
  },
  {
    id: 3,
    description: "chocolate bar",
    price: 0.85,
    type: "book/food/med",
    origin: "national",
  },
  {
    id: 4,
    description: "imported box of chocolate",
    price: 10.0,
    type: "book/food/med",
    origin: "imported",
  },
  {
    id: 5,
    description: "imported bottle of perfume",
    price: 47.5,
    type: "misc",
    origin: "imported",
  },
  {
    id: 6,
    description: "imported bottle of perfume",
    price: 27.99,
    type: "misc",
    origin: "imported",
  },
  {
    id: 60,
    description: "bottle of perfume",
    price: 18.99,
    type: "misc",
    origin: "national",
  },
  {
    id: 8,
    description: "packet of headache pills",
    price: 9.75,
    type: "book/food/med",
    origin: "national",
  },
  {
    id: 16,
    description: "imported boxes of chocolates",
    price: 11.25,
    type: "book/food/med",
    origin: "imported",
  },
];

var item_name = "";
var item_value;
var itemQty;
var total = [];
var taxes = [];

//item_value now has the actual value of the object that was selected
function fetchProduct() {
  var select = document.getElementById("product");
  var option = select.options[select.selectedIndex];
  item_name = option.text;
  item_value = option.value;
  console.log(item_value);
}

//added this feature to map over the "database" and append into html automatically
let element = document.getElementById("product");
let nodes = data.map((item) => {
  let opt = document.createElement("option");
  opt.textContent = item.description;
  opt.value = item.id;
  return opt;
});

element.append(...nodes);

function fetchQty() {
  var select = document.getElementById("quantity");
  var option = select.options[select.selectedIndex];
  console.log(option.text);
  itemQty = option.text;
}

//onClick listener from html will fetch product and quantity from select and
//will pass as props to taxCal
//added searchItem that takes the actual object, not array position anymore
function addItem() {
  fetchProduct();
  fetchQty();
  if (itemQty > 0 && item_name !== "") {
    const searchItem = data.find((element) => element.id == item_value);
    console.log(searchItem);
    taxCalc(searchItem, itemQty);
    // printItems(itemQty, findItem);
  } else {
    return null;
  }
}

//taxCal will calculate the taxes and total sale for each item added based on their taxes
//category and then call function printItems
function taxCalc(item, qty) {
  if (item.type === "book/food/med" && item.origin === "national") {
    let tot = Math.round(qty * item.price * 1 * 100) / 100;
    let tx = tot - item.price * qty;
    total.push(tot);
    taxes.push(tx);
    printItems(qty, item, tot);
  } else {
    if (item.type === "book/food/med" && item.origin === "imported") {
      let tot = Math.round(qty * item.price * 1.05 * 100) / 100;
      let tx = tot - item.price * qty;
      console.log(item);
      total.push(tot);
      taxes.push(tx);
      printItems(qty, item, tot);
    } else {
      if (item.type === "misc" && item.origin === "national") {
        let tot = Math.round(qty * item.price * 1.1 * 100) / 100;

        let tx = tot - item.price * qty;
        console.log(item);
        total.push(tot);
        taxes.push(tx);
        printItems(qty, item, tot);
      } else {
        if (item.type === "misc" && item.origin === "imported") {
          let tot = Math.round(qty * item.price * 1.15 * 100) / 100;
          let tx = tot - item.price * qty;
          console.log(item);
          total.push(tot);
          taxes.push(tx);
          printItems(qty, item, tot);
        }
      }
    }
  }
}
function printItems(qty, data, tot) {
  let ul = document.getElementsByTagName("ul")[0];
  let li = document.createElement("li");
  li.textContent = qty + " " + data.description + " " + tot;
  ul.prepend(li);
  console.log(total);
  var displayTotal = Math.round(total.reduce((a, b) => a + b, 0) * 100) / 100;
  var displayTaxes = Math.round(taxes.reduce((a, b) => a + b, 0) * 100) / 100;
  console.log(Math.round(total.reduce((a, b) => a + b, 0) * 100) / 100);
  document.getElementById("total").innerHTML = "Total: $" + displayTotal;
  document.getElementById("sales_taxes").innerHTML =
    "Sales taxes: $" + displayTaxes;
}
