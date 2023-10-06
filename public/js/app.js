console.log("client side javascript file loaded");
const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading.....";
  messageOne.textContent = "";
  fetch(
    `http://api.weatherstack.com/current?access_key=52e5537d6fd5ad5905078f54953c9899&query=${location}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location.name;
        messageTwo.textContent = `The current temperature in ${data.location.name} is ${data.current.temperature} degree Celsius and the chances of rain are ${data.current.precip}%`;
      }
    });
  });
});
