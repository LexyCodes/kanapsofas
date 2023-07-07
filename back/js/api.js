async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById('items');

  products.forEach((product) => {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.href = `./product.html?id=${product._id}`;

    const image = document.createElement('img');
    image.src = `../images/${product.imageUrl}.jpg`;
    image.alt = product.altTxt;
    link.appendChild(image);

    const name = document.createElement('h3');
    name.className = 'productName';
    name.textContent = product.name;
    link.appendChild(name);

    const description = document.createElement('p');
    description.className = 'productDescription';
    description.textContent = product.description;
    link.appendChild(description);

    article.appendChild(link);
    productContainer.appendChild(article);
  });
}

getProducts()
  .then((products) => displayProducts(products))
  .catch((error) => console.error('Error:', error));
