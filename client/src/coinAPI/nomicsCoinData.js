export async function getCoinList() {
  //supported Coins
  const supportedCoins = ["BTC", "ETH", "DOGE", "LTC"];
  var coinIDString = "";
  for (var i = 0; i < supportedCoins.length - 1; i++) {
    coinIDString += supportedCoins[i] + ",";
  }
  coinIDString += supportedCoins[supportedCoins.length - 1];
  const API_KEY = "841ea943f32644f783a43a232e401d2f80646a4f";
  const promise = require("axios").get(
    `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=${coinIDString}&interval=1d,2d&convert=USD&per-page=100&page=1`
  );
  const promiseData = promise.then((response) => {
    return response.data;
  });
  return promiseData;
}
