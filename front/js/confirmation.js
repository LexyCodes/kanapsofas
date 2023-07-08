// Function to extract the order ID from the URL
function getOrderIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('orderId');
}

// Function to display the order ID on the page
function displayOrderId() {
  const orderIdElement = document.getElementById('orderId');
  const orderId = getOrderIdFromURL();

  if (orderId) {
    orderIdElement.textContent = orderId;
  } else {
    orderIdElement.textContent = 'Order ID not found';
  }
}

// Event listener to display the order ID when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayOrderId);
