buttons = document.getElementsByTagName("button");
let base_price = document.getElementById("base-price");
let total = 1299;

window.onload = () => {
  main();
};

function main() {
  let memory_16 = document.getElementById("16gb-memory");
  memory_16.addEventListener("click", extra_cost_for_16gb);
  let storage_512 = document.getElementById("512gb-storage");
  storage_512.addEventListener("click", extra_cost_for_512gb);
  let storage_1TB = document.getElementById("1tb-storage");
  storage_1TB.addEventListener("click", extra_cost_for_1TB);
  let early_delivery = document.getElementById("early-delivery");
  early_delivery.addEventListener("click", elarlyDelivery);
  let applyBtn = document.getElementById("apply-btn");
  applyBtn.addEventListener("click", promo_code);
}

function extra_cost_for_16gb() {
  total += 200;
  let extra_cost = document.getElementById("memory-cost");
  extra_cost.innerText = 200;
  update();
}

function extra_cost_for_512gb() {
  total += 100;
  let extra_cost_for_storage = document.getElementById("storage-cost");
  extra_cost_for_storage.innerText = 100;
  update();
}

function extra_cost_for_1TB() {
  total += 300;
  let extra_cost_for_storage = document.getElementById("storage-cost");
  extra_cost_for_storage.innerText = 300;
  update();
}

function elarlyDelivery() {
  total += 20;
  let delivery_charge = document.getElementById("delivery-cost");
  delivery_charge.innerText = 20;
  update();
}

let promoApplied = false;
let appliedPromoCode = null; 
function promo_code() {
  const inputField = document.getElementById("input-field");
  const userPayment = document.getElementById("user-payment");
  const totalPriceElement = document.getElementById("total-price");
  const enteredCode = inputField.value.trim();

  const promoCodes = {
    ostad10: 0.10,
    ostad5: 0.05,
  };
  if (promoApplied && appliedPromoCode === enteredCode) {
    alert("This promo code has already been applied.");
    return;
  }

  if (promoCodes[enteredCode] !== undefined) {
    const discountRate = promoCodes[enteredCode];
    const discountAmount = total * discountRate;
    const discountedTotal = total - discountAmount;

   // totalPriceElement.innerText = discountedTotal.toFixed(2);
    userPayment.innerText = discountedTotal.toFixed(2);
    promoApplied = true;
    appliedPromoCode = enteredCode;
    alert(
      `Promo code applied successfully! ${discountRate * 100}% discount applied.`
    );
  } else {
    alert("Invalid promo code. Please try again.");
  }
}

function update() {
  const totalPriceElement = document.getElementById("total-price");
  const userPaymentElement = document.getElementById("user-payment");
  if (promoApplied && appliedPromoCode) {
    const promoCodes = {
      ostad10: 0.10,
      ostad5: 0.05,
    };
    const discountRate = promoCodes[appliedPromoCode];
    const discountAmount = total * discountRate;
    const discountedTotal = total - discountAmount;

    totalPriceElement.innerText = discountedTotal.toFixed(2);
    userPaymentElement.innerText = discountedTotal.toFixed(2);
  } else {
    totalPriceElement.innerText = total;
    userPaymentElement.innerText = total;
  }
}

function resetPromo() {
  promoApplied = false;
  appliedPromoCode = null;
  update(); // Recalculate total without discount
  alert("Promo code has been reset.");
}