// Function to fetch product data from the server based on the provided product ID
async function getProduct(productId) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}

// Function to display the product details on the webpage
function displayProduct(product) {
  const titleElement = document.getElementById('title');
  const priceElement = document.getElementById('price');
  const descriptionElement = document.getElementById('description');
  const colorsElement = document.getElementById('colors');
  const imageElement = document.getElementById('productImage');

  // Set the product details in the corresponding HTML elements
  titleElement.textContent = product.name;
  priceElement.textContent = product.price;
  descriptionElement.textContent = product.description;
  imageElement.src = `${product.imageUrl}`;
  imageElement.alt = product.imageAlt;

  // Update the colors dropdown with the available color options
  colorsElement.innerHTML = '';
  product.colors.forEach((color) => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color;
    colorsElement.appendChild(option);
  });
}

// Extract the product ID from the URL query string
const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get('id');

// Fetch the product data using the extracted product ID and display it on the webpage
getProduct(productId)
  .then((product) => displayProduct(product))
  .catch((error) => console.error('Error:', error));

// Retrieve cart items from LocalStorage or initialize an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to save cart items to LocalStorage
function saveCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

// Function to handle the "Add to Cart" button click
function addToCart(productId, quantity, color) {
  getProduct(productId)
    .then((product) => {
      // Check if the product already exists in the cart
      const existingItem = cartItems.find(
        (item) => item.productId === productId && item.color === color
      );

      if (existingItem) {
        // If the product already exists, increase the quantity
        existingItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it as a new item
        const newItem = {
          productId,
          name: product.name,
          description: product.description,
          image: product.imageUrl,
          imageAlt: product.imageAlt,
          price: product.price,
          quantity,
          color,
        };
        cartItems.push(newItem);
      }

      // Save the updated cart items to LocalStorage
      saveCartItems(cartItems);

      // Show success message
      alert('Product added to cart!');
    })
    .catch((error) => console.error('Error:', error));
}

// Event listener to handle the "Add to Cart" button click
const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', () => {
  const quantity = parseInt(document.getElementById('quantity').value, 10);
  const color = document.getElementById('colors').value;

  // Validate the quantity input
  if (isNaN(quantity) || quantity <= 0) {
    alert('Please enter a valid quantity.');
    return;
  }

  // Add the product to the cart with the specified quantity and color
  addToCart(productId, quantity, color);
});

// Update the cart counter on page load
function updateCartCounter() {
  const cartCounter = document.getElementById('cartCounter');
  cartCounter.textContent = cartItems.reduce((total, item) => total + item.quantity, 0).toString();
}

updateCartCounter();
