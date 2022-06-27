export default async function getDayPrice(coin, month, day, year) {
  let months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  let limit = "1";
  let API_KEY =
    "b889cf9383217670545f664394eae0bed5ee2777a869b3392c69d5691465b7d4";
  let dateString = Math.floor(
    new Date(`${months[month]} ${day} ${year} 12:00:00`).getTime() / 1000
  );
  const promise = require("axios").get(
    `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=USD&api_key=${API_KEY}&toTs=${dateString}&limit=${limit}`
  );
  const promiseData = promise
    .then((response) => {
      console.log(response);
      return response.data.Data.Data[0].close;
    })
    .catch((error) => {
      console.log(error);
    });
  return promiseData;
}
