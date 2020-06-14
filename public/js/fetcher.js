const weatherForm = document.querySelector("form");
const search = document.querySelector("input")
const p1 = document.querySelector("#result1")
const p2 = document.querySelector("#result2")


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  p1.textContent = "Loading...";

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        p1.textContent = (data.error);
      } else {
        p1.textContent = `Weather for ${data.location}`;
        p2.textContent = `${data.temperature} degrees (Celcius)`;
      }
    });
  });
});


