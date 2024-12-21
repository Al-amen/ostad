buttons = document.getElementsByTagName("button");
let base_price = document.getElementById("base-price");
let total = 1229;



window.onload = () => {
  main();
}


function main() {
  let memory_16 = document.getElementById("16gb-memory")
  memory_16.addEventListener("click",extra_cost_for_16gb);
  let storage_512 = document.getElementById("512gb-storage")
  storage_512.addEventListener("click",extra_cost_for_512gb);
  let storage_1TB = document.getElementById("1tb-storage")
  storage_1TB.addEventListener("click",extra_cost_for_1TB);
  let early_delivery = document.getElementById("early-delivery");
  early_delivery.addEventListener("click",elarlyDelivery);
  let applyBtn = document.getElementById('apply-btn');
  applyBtn.addEventListener('click',promo_code);

 
   
}

function extra_cost_for_16gb() {
   total += 10;
   let extra_cost = document.getElementById("memory-cost");
   extra_cost.innerText = 10;
   update();

}


function extra_cost_for_512gb() {
  total += 20;
  let extra_cost_for_storage = document.getElementById("storage-cost");
  extra_cost_for_storage.innerText = 20;
  update();
}


function extra_cost_for_1TB() {
  total += 20;
  let extra_cost_for_storage = document.getElementById("storage-cost");
  extra_cost_for_storage.innerText = 40;
  update();
}


function elarlyDelivery() {
  total += 20;
  let delivery_charge = document.getElementById("delivery-cost");
  delivery_charge.innerText = 20;
  update();
   
}

function promo_code() {
  const inputField = document.getElementById('input-field');
  const userPayment = document.getElementById('user-payment');
  const prormoCode = "ostad";
  const discount = .1;

  const enteredCode = inputField.value.trim();
  
  let totalPayment = total;

  if (enteredCode === prormoCode) {
    
      const discountAmount = totalPayment * discount;
      totalPayment -= discountAmount;
      userPayment.innerText = totalPayment.toFixed(2);
      alert('Promo code applied successfully! 10% discount applied.');


  }
  else {
    alter('Invalid promo code. Please try again.');
  }

}
function update() {
  let total_price = document.getElementById("total-price");
  
  total_price.innerText = total;
  const userPayment = document.getElementById('user-payment').innerText = total;
  console.log(`total ${total}`);
  

}

