// Asynchronously fetches the list of products from the API
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

// Displays the products on the webpage
function displayProducts(products) {
  const productContainer = document.getElementById('items');

  products.forEach((product) => {
    // Create an article element to hold each product
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.href = `./product.html?id=${product._id}`;

    // Create an image element and set its source and alt text
    const image = document.createElement('img');
    image.src = `${product.imageUrl}`;
    image.alt = product.altTxt;
    link.appendChild(image);

    // Create a heading element for the product name
    const name = document.createElement('h3');
    name.className = 'productName';
    name.textContent = product.name;
    link.appendChild(name);

    // Create a paragraph element for the product description
    const description = document.createElement('p');
    description.className = 'productDescription';
    description.textContent = product.description;
    link.appendChild(description);

    // Append the link with the image, name, and description to the article
    article.appendChild(link);

    // Append the article to the product container
    productContainer.appendChild(article);
  });
}

// Retrieves the product ID from the URL query string
function getProductIdFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
}

// Fetch the products, then display them on the webpage
getProducts()
  .then((products) => displayProducts(products))
  .catch((error) => console.error('Error:', error));
