const handleFetchData = async (query = '') => {
  const res = await fetch(`http://localhost:3000/shop?q=${query}`);
  const shoArrays = await res.json();
  return shoArrays
    .filter((shop) => shop.name.toLowerCase().includes(query.toLowerCase()))
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
};

const handleRenderUsers = () => {
  handleFetchData()
    .then(itemData => {
      const outputElement = document.querySelector('#output')
      outputElement.innerHTML = itemData
    })
}
handleRenderUsers();

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

let handleUpdate = (id) => {
  let selectItem = shopObj.find((x) => x.id === id);
  console.log(selectItem.id);
  document.getElementById(id).innerHTML = selectItem.item;
  handleArithmetic()
}

let handleArithmetic = () => {
  let cartIcon = document.getElementById('cartAmount')
  console.log('Calculating price')
  cartIcon.innerHTML = shopObj.map((x) => x.item).reduce((x, y) => x + y, 0)
}