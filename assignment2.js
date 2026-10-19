let billAmount = Number(100);
let tipPercentage = Number(15);
let calculatedTip = billAmount * tipPercentage / 100;
let totalAmount = billAmount;
totalAmount += calculatedTip;

console.log(`Subtotal: $${billAmount}`);
console.log(`Tip Percentage: ${tipPercentage}%`);
console.log(`Calculated Tip: $${calculatedTip}`);
console.log(`Total Amount to Pay: $${totalAmount}`);
