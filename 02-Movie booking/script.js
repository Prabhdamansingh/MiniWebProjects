const container = document.querySelector(".container");
const seat = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// update total and count
updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatIndex = [...selectedSeats].map((s) => [...seat].indexOf(s));
  console.log(seatIndex);

  localStorage.setItem("selectedSeatIndex", JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = ticketPrice * selectedSeatsCount;
};

//setting movie and its index to local storage
setMovieData = (moviePrice, movieIndex) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("ticketPrice", moviePrice);
};

// populate UI with local storage data if any
populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeatIndex"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seat.forEach((s, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        s.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

populateUI();
let ticketPrice = +movieSelect.value;

// movie select eventlister
movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  movieIndex = e.target.selectedIndex;
  setMovieData(ticketPrice, movieIndex);
  updateSelectedCount();
});

// selected seats evenetlistner
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
updateSelectedCount();
