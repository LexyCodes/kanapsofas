function getOrderIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('orderId');
}

function displayOrderId() {
  const orderIdElement = document.getElementById('orderId');
  const orderId = getOrderIdFromURL();

  if (orderId) {
    orderIdElement.textContent = orderId;
  } else {
    orderIdElement.textContent = 'Order ID not found';
  }
}

document.addEventListener('DOMContentLoaded', displayOrderId);
