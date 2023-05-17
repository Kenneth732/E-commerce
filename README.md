# This code is a simple shopping cart application implemented using JavaScript.

# handleFetchData() 
```
is an asynchronous function that fetches data from an API endpoint. The query parameter is optional and can be used to search for a specific item. The function then filters the data based on the query and maps it to an HTML string that represents the item's card. The handleRenderUsers() function calls handleFetchData() and sets the HTML of an element with an ID of "output" to the mapped HTML string.
```
# shopObj
```
 is an array that stores the items in the cart. The handleIncrement() and handleDecrement() functions update the shopObj array based on the item's ID passed as a parameter. If the item is not already in the cart, it is added with a quantity of 1. Otherwise, the quantity of the item is incremented or decremented based on the button clicked. The handleUpdate() function is called in both cases to update the HTML of the cart element with the new quantity.
```
# The handleUpdate() 
```
function searches for the item with the specified ID in the shopObj array and updates the HTML of the element with the same ID to display the new quantity. It also calls the handleArithmetic() function to update the total quantity displayed in the cart icon.
```
# The handleArithmetic() 
```
function updates the cart icon element with the total quantity of items in the cart. It does this by mapping the shopObj array to an array of quantities and then using the reduce() method to sum the values.
```



> This line defines a function called handleFetchData which takes an optional parameter called query. This function returns a Promise object that will resolve with an array of products from a local server.
```
const handleFetchData = async (query = '') => {
```

> This line sends an HTTP GET request to the server with the given query string parameter. The await keyword tells JavaScript to wait for the response to come back before moving on to the next line.

```
  const res = await fetch(`http://localhost:3000/shop?q=${query}`);
```

> This line sends an HTTP GET request to the server with the given query string parameter. The await keyword tells JavaScript to wait for the response to come back before moving on to the next line.
```
  const shoArrays = await res.json();
```

> This line extracts the JSON data from the server's response body and assigns it to the variable shoArrays.

```
  return shoArrays
    .filter((shop) => shop.name.toLowerCase().includes(query.toLowerCase()))

```

> This line filters the shoArrays array based on the query parameter. It returns a new array that contains only the products whose name matches the query (case-insensitive).

```
    .map(({ name, image, price, category, id }) => `
          <div id=product-id-${id} class="card">
            <div class="image-list">
               <img src="${image}" alt="${name}" />
            </div>
            <h2>${name}</h2>
            <p>${price}</p>
            <p>${category}</p>
            <div class="calc">
               <button onClick="handleDecrement(${id})" class="bi bi-dash-lg"><p>-</p></button>
               <div id=${id} class="quantity">0</div>
               <button onClick="handleIncrement(${id})" class="bi bi-dash-lg"><p>+</p></button>
            </div>
          </div>
        `).join(' ');

```

> This line maps each product in the filtered array to an HTML string that represents a card. The string uses the product's properties to populate the card's content, including an id attribute that uniquely identifies the card.

```
const handleRenderUsers = () => {
  handleFetchData()
    .then(itemData => {
      const outputElement = document.querySelector('#output')
      outputElement.innerHTML = itemData
    })
}
handleRenderUsers();

```

> This code defines a function called handleRenderUsers that calls handleFetchData and updates the innerHTML property of an HTML element with the id of output using the filtered and mapped HTML strings. Finally, it calls handleRenderUsers to execute the function.

```
let shopObj = [];

let handleIncrement = (id) => {
  let selectItem = shopObj.find((x) => x.id === id);

  if (selectItem === undefined) {
    shopObj.push({
      id: id,
      item: 1
    });
  } else {
    selectItem.item += 1;
  }
  handleUpdate(id);
}

let handleDecrement = (id) => {
  let selectItem = shopObj.find((x) => x.id === id);

  if (selectItem.item === 0) return;
   else {
    selectItem.item -= 1;
  }
  handleUpdate(id);
}

```

>  These lines define two functions: handleIncrement and handleDecrement, which are event handlers for clicking on the "+" and "-" buttons respectively. These functions update the shopObj array with the selected product and quantity. If the product already exists in shopObj, it simply updates its