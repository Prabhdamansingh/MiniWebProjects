const CurrencyEl_one = document.getElementById("currency-one");
const CurrencyEl_two = document.getElementById("currency-two");
const Amount_one = document.getElementById("amount-one");
const Amount_two = document.getElementById("amount-two");
const RateEl = document.getElementById("rate");
const Swap = document.getElementById("swap");

//calculating values and fetching exchange rate
Calculate = () => {
  const Currency_one = CurrencyEl_one.value;
  const Currency_two = CurrencyEl_two.value;
  fetch(
    `https://prime.exchangerate-api.com/v5/7292b9a41848443de7faacb2/latest/${Currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[Currency_two];
      RateEl.innerHTML = `1 ${Currency_one} =  ${rate} ${Currency_two}`;
      Amount_two.value = (rate * Amount_one.value).toFixed(2);
    });
};

// event Listeners
CurrencyEl_one.addEventListener("change", Calculate);
CurrencyEl_two.addEventListener("change", Calculate);
Amount_one.addEventListener("input", Calculate);
Amount_two.addEventListener("input", Calculate);
Swap.addEventListener("click", () => {
  const temp = CurrencyEl_one.value;
  CurrencyEl_one.value = CurrencyEl_two.value;
  CurrencyEl_two.value = temp;
  Calculate();
});
Calculate();
