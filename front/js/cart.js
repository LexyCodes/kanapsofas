// Retrieve cart items from LocalStorage or initialize an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to save cart items to LocalStorage
function saveCartItems(items) {
  const itemsWithoutPrice = items.map((item) => {
    return {
      productId: item.productId,
      color: item.color,
      quantity: item.quantity,
    };
  });
  localStorage.setItem('cartItems', JSON.stringify(itemsWithoutPrice));
  updateCartCounter(); // Update the cart counter after saving the items
}

// Function to display cart items in the cart section
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart__items');
  cartItemsContainer.innerHTML = '';

  let totalPrice = 0; // Initialize total price

  cartItems.forEach((item) => {
    // Create an article element to hold each cart item
    const article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('data-id', item.productId);
    article.setAttribute('data-color', item.color);

    // Create an image element for the cart item
    const itemImage = document.createElement('div');
    itemImage.classList.add('cart__item__img');
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = 'Photo of a sofa';
    itemImage.appendChild(image);

    // Create a div element for the cart item content
    const itemContent = document.createElement('div');
    itemContent.classList.add('cart__item__content');

    // Create a div element for the cart item description
    const itemDescription = document.createElement('div');
    itemDescription.classList.add('cart__item__content__description');
    const itemName = document.createElement('h2');
    itemName.textContent = item.name;
    const itemColor = document.createElement('p');
    itemColor.textContent = item.color;
    const itemPrice = document.createElement('p');
    itemPrice.textContent = `€${item.price}`;
    itemDescription.appendChild(itemName);
    itemDescription.appendChild(itemColor);
    itemDescription.appendChild(itemPrice);

    // Create a div element for the cart item settings
    const itemSettings = document.createElement('div');
    itemSettings.classList.add('cart__item__content__settings');

    // Create a div element for the cart item quantity
    const itemQuantity = document.createElement('div');
    itemQuantity.classList.add('cart__item__content__settings__quantity');
    const quantityLabel = document.createElement('p');
    quantityLabel.textContent = 'Quantity: ';
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.classList.add('itemQuantity');
    quantityInput.name = 'itemQuantity';
    quantityInput.min = '1';
    quantityInput.max = '100';
    quantityInput.value = item.quantity;
    itemQuantity.appendChild(quantityLabel);
    itemQuantity.appendChild(quantityInput);

    // Create a div element for the cart item delete button
    const itemDelete = document.createElement('div');
    itemDelete.classList.add('cart__item__content__settings__delete');
    const deleteButton = document.createElement('p');
    deleteButton.classList.add('deleteItem');
    deleteButton.textContent = 'Delete';
    itemDelete.appendChild(deleteButton);

    // Append elements to their respective parent elements
    itemSettings.appendChild(itemQuantity);
    itemSettings.appendChild(itemDelete);

    itemContent.appendChild(itemDescription);
    itemContent.appendChild(itemSettings);

    article.appendChild(itemImage);
    article.appendChild(itemContent);

    // Append the cart item to the cart items container
    cartItemsContainer.appendChild(article);

    // Calculate the item total price
    const itemTotalPrice = item.price * item.quantity;
    totalPrice += itemTotalPrice;
  });

  // Update the total quantity and price
  const totalQuantityElement = document.getElementById('totalQuantity');
  const totalPriceElement = document.getElementById('totalPrice');

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = `€${totalPrice.toFixed(2)}`;

  // Reattach event listeners
  addDeleteButtonListeners();
  addQuantityInputListeners();
}

// Update the cart counter on quantity change or item delete
function updateCartCounter() {
  const cartCounter = document.getElementById('cartCounter');
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCounter.textContent = totalQuantity.toString();
}

// Delete item from the cart
function deleteCartItem(article) {
  const itemId = article.dataset.id;
  const itemColor = article.dataset.color;

  // Remove the item from the cartItems array
  cartItems = cartItems.filter((item) => item.productId !== itemId || item.color !== itemColor);

  // Save the updated cart items to LocalStorage
  saveCartItems(cartItems);
  displayCartItems();
  updateCartCounter();
}

// Add event listeners to delete buttons
function addDeleteButtonListeners() {
  const deleteButtons = document.getElementsByClassName('deleteItem');
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener('click', function () {
      const article = button.closest('.cart__item');
      deleteCartItem(article);
    });
  });
}

// Add event listeners for quantity input
function addQuantityInputListeners() {
  const quantityInputs = document.querySelectorAll('.itemQuantity');
  quantityInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      const newQuantity = parseInt(event.target.value);
      const itemId = event.target.closest('.cart__item').dataset.id;
      const itemColor = event.target.closest('.cart__item').dataset.color;

      // Update the quantity of the item in the cartItems array
      cartItems = cartItems.map((item) => {
        if (item.productId === itemId && item.color === itemColor) {
          item.quantity = newQuantity;
        }
        return item;
      });

      // Save the updated cart items to LocalStorage
      saveCartItems(cartItems);
      updateCartCounter();
      displayCartItems();
    });
  });
}

// Initialize the cart page
function initializeCartPage() {
  // Display cart items and update cart counter
  displayCartItems();
  updateCartCounter();
  addQuantityInputListeners();

  // Update the event listener for delete button
  const deleteButtons = document.querySelectorAll('.deleteItem');
  deleteButtons.forEach((button) => {
    button.removeEventListener('click', deleteCartItem); // Remove existing event listener
    button.addEventListener('click', (event) => {
      const article = event.target.closest('.cart__item');
      deleteCartItem(article);
      updateCartCounter(); // Update the cart counter after deleting an item
    });
  });

  // Add event listener for order form submission
  const orderForm = document.querySelector('.cart__order__form');
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Retrieve form input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;

    // Validate form inputs
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    const emailErrorMsg = document.getElementById('emailErrorMsg');

    // If fields are empty include error messages
    firstNameErrorMsg.textContent = '';
    lastNameErrorMsg.textContent = '';
    addressErrorMsg.textContent = '';
    cityErrorMsg.textContent = '';
    emailErrorMsg.textContent = '';

    // Validation of expressions
    const alphabeticRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    let hasErrors = false; // Track if any errors occurred

    if (!firstName.match(alphabeticRegex)) {
      firstNameErrorMsg.textContent = 'Please enter a valid first name.';
      return;
    }

    if (!lastName.match(alphabeticRegex)) {
      lastNameErrorMsg.textContent = 'Please enter a valid last name.';
      return;
    }

    if (address === '') {
      addressErrorMsg.textContent = 'Please enter your address.';
      return;
    }

    if (city === '') {
      cityErrorMsg.textContent = 'Please enter your city.';
      return;
    }

    if (!email.match(emailRegex)) {
      emailErrorMsg.textContent = 'Please enter a valid email address.';
      return;
    }

    if (hasErrors) {
      // If any errors occurred, prevent form submission
      return;
    }

    // Create order object
    const order = {
      contact: {
        firstName,
        lastName,
        address,
        city,
        email,
      },
      products: cartItems.map((item) => {
        return {
          productId: item.productId,
          color: item.color,
          quantity: item.quantity,
        };
      }),
    };

    // Send the order data to the server
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          // Order created successfully
          return response.json();
        } else {
          // Handle error response
          throw new Error('Order creation failed.');
        }
      })
      .then((data) => {
        const orderId = data.orderId; // Extract the order ID from the response data

        // Store the order ID in LocalStorage or use it as needed
        const confirmationPageURL = `../html/confirmation.html?orderId=${orderId}`;
        window.location.href = confirmationPageURL;

        console.log('Order ID:', orderId);

        // Clear the cart and display a success message
        cartItems = [];
        saveCartItems(cartItems);
        displayCartItems();
        alert('Order placed successfully! Thank you for shopping with us.');

        // Redirect to the confirmation page
        window.location.href = confirmationPageURL;
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
        alert('Failed to place the order. Please try again.');
      });
  });
}

// Call the initializeCartPage function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCartPage);