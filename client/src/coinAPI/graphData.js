export default async function getDayPrice(coin) {
  let limit = "200";
  let API_KEY =
    "b889cf9383217670545f664394eae0bed5ee2777a869b3392c69d5691465b7d4";
  let startDateString = Math.floor(new Date(Date.now()).getTime() / 1000);

  const promise = require("axios").get(
    `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=USD&api_key=${API_KEY}&toTs=${startDateString}&limit=${limit}`
  );
  const promiseData = promise
    .then((response) => {
      return response.data.Data.Data;
    })
    .catch((error) => {
      console.log(error);
    });
  return promiseData;
}
