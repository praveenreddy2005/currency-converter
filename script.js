let exchangeRates = {};

// Load local rates.json once when page loads
fetch("rates.json")
  .then(response => response.json())
  .then(data => {
    exchangeRates = data;
  })
  .catch(err => {
    console.error("Failed to load local rates.json:", err);
    const resultElement = document.getElementById("result");
    if (resultElement) {
      resultElement.textContent = "Failed to load currency rates.";
    }
  });

const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const resultElement = document.getElementById("result");

// Populate dropdowns
if (fromSelect && toSelect) {
  currencies.forEach(curr => {
    let option1 = document.createElement("option");
    option1.value = curr;
    option1.text = curr;
    fromSelect.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = curr;
    option2.text = curr;
    toSelect.appendChild(option2);
  });

  fromSelect.value = "USD";
  toSelect.value = "INR";
}

function convertCurrency() {
  const amountInput = document.getElementById("amount");
  if (!amountInput || !resultElement) return;

  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount || isNaN(amount)) {
    resultElement.textContent = "Please enter a valid amount.";
    return;
  }

  if (exchangeRates[from] && exchangeRates[from][to]) {
    const rate = exchangeRates[from][to];
    const converted = (amount * rate).toFixed(2);
    resultElement.textContent = `${amount} ${from} = ${converted} ${to}`;
  } else {
    resultElement.textContent = "Conversion rate not available.";
  }
}
