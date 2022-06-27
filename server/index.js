const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const rp = require("request-promise");

var cors = require("cors");
// app.use(cors);

// Have Node serve the files for out built React app
//app.use();
app.use(function (req, res, next) {
  express.static(path.resolve(__dirname, "../client/build"));
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

const { Pool } = require("pg");
const { table } = require("console");
const pool = new Pool({
  connectionString:
    "postgres://xdoyzvjyepifbx:b133e6cfea96b8992f594499ef2ff35f6d8ad52f0c80ff89168e5b03d8d30321@ec2-44-199-83-229.compute-1.amazonaws.com:5432/d6kn14ipkk9h79",
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT * FROM USERS", (err, res) => {
  if (err) {
    console.log("Error - Failed to select all from Users");
    console.log(err);
  } else {
    console.log(res.rows);
  }
});

const requestOptions = {
  method: "GET",
  uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,DOGE,LTC",
  headers: {
    "X-CMC_PRO_API_KEY": "8a52393e-2cd1-4555-8da2-93b184b76903",
  },
  json: true,
  gzip: true,
};

async function getDayPrice(coin) {
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
  let dateString = Math.floor(new Date(Date.now()).getTime() / 1000);
  const promise = require("axios").get(
    `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=USD&api_key=${API_KEY}&toTs=${dateString}&limit=${limit}`
  );
  const promiseData = promise
    .then((response) => {
      return response.data.Data.Data[0].close;
    })
    .catch((error) => {
      console.log(error);
    });
  return promiseData;
}

let dict = { BTC: 0, ETH: 1, DOGE: 2, LTC: 3 };
let coinDict = { 0: "BTC", 1: "ETH", 2: "DOGE", 3: "LTC" };

let coinValues = [0, 0, 0, 0];

for (var i = 0; i < 4; i++) {
  getDayPrice(coinDict[i]).then((data) => {
    coinValues[i] = data;
  });
}

// Hangle GET request for /api route
app.get("/api", cors(), (req, res) => {
  // const d = new Date();
  // console.log(d)
  // console.log(d.getMonth())
  // console.log(d.getDate())
  // console.log(d.getYear())
  // let btcPrice = getDayPrice("BTC", d.getMonth(), d.getDate(), d.getYear());
  // console.log(btcPrice)

  rp(requestOptions)
    .then((response) => {
      let btcPrice = response.data.BTC.quote.USD.price;
      let ethPrice = response.data.ETH.quote.USD.price;
      let dogePrice = response.data.DOGE.quote.USD.price;
      let ltcPrice = response.data.LTC.quote.USD.price;
      let msg =
        "BTC: " +
        btcPrice +
        " ETH: " +
        ethPrice +
        " DOGE: " +
        dogePrice +
        " LTC: " +
        ltcPrice;
      coinValues = [btcPrice, ethPrice, dogePrice, ltcPrice];
      console.log(msg);
      res.json({ message: msg });
    })
    .catch((err) => {
      console.log("API call error:", err.message);
    });
});

// inititalize wallet
app.put("/api/init/", cors(), (req, res) => {
  let sub = req.query.sub;
  console.log(req.query.sub);
  pool.query(
    "SELECT COUNT(userid) FROM USERS WHERE sub = '" + sub + "'",
    (err, res) => {
      if (err) {
        console.log("Error - Failed to select all from Users");
        console.log(err);
      } else {
        console.log(parseInt(res.rows[0].count));
        if (parseInt(res.rows[0].count) == 0) {
          // key is not found, insert new user
          console.log("WE ARE IN");
          pool.query(
            "INSERT INTO USERS VALUES (DEFAULT, 1000000, '" + sub + "')",
            (err, resInsert) => {
              if (err) {
                console.log("Error - Failed to insert new User");
                console.log(err);
              } else {
                console.log(resInsert);
              }
            }
          );
        }
      }
    }
  );
  res.send("Initialization Complete");
});

// buy coins
app.put("/api/buy/", (req, res) => {
  let sub = req.query.sub;
  let coin = req.query.coin; // need to initialize
  let priceIndex = dict[coin]; // fetch from API
  let quantity = req.query.quantity; // initialize.
  let userid = 4;
  let sendMsg = "Insufficient Funds";
  let buybalance;
  pool.query(
    "SELECT balance FROM USERS WHERE sub = '" + sub + "'",
    (err, resBuybalance) => {
      if (err) {
        console.log("Error - Failed to fetch balance from Users");
        console.log(err);
      } else {
        pool.query(
          "SELECT userid FROM USERS WHERE sub = '" + sub + "'",
          (err, resBuyuserid) => {
            if (err) {
              console.log("Error - Failed to get userid");
              console.log(err);
            } else {
              userid = resBuyuserid.rows[0].userid; // change to get actual user id value, idk the JSON format for this
              console.log(resBuyuserid.rows[0].userid);
              // check if there are sufficient funds
              let priceQuantity = coinValues[priceIndex] * quantity;
              buybalance = resBuybalance.rows[0].balance;
              if (priceQuantity > buybalance) {
                console.log("Cannot buy, insufficient funds.");
              } else {
                // insert into transaction table
                console.log(
                  "INSERT INTO TRANSACTION VALUES (DEFAULT, " +
                    userid +
                    ", '" +
                    coin +
                    "', " +
                    quantity +
                    ", NOW(), true, " +
                    coinValues[priceIndex] +
                    ")"
                );
                pool.query(
                  "INSERT INTO TRANSACTION VALUES (DEFAULT, " +
                    userid +
                    ", '" +
                    coin +
                    "', " +
                    quantity +
                    ", NOW(), true, " +
                    coinValues[priceIndex] +
                    ")",
                  (err, resBuyinsert) => {
                    if (err) {
                      console.log(
                        "Error - Failed to insert new buy transaction"
                      );
                      console.log(err);
                    } else {
                      // update user balance
                      let newBalance = buybalance - priceQuantity;
                      pool.query(
                        "UPDATE USERS SET BALANCE = " +
                          newBalance +
                          " WHERE sub = '" +
                          sub +
                          "'",
                        (err, resBuyupdate) => {
                          if (err) {
                            console.log(
                              "Error - Failed to update new buy balance"
                            );
                            console.log(err);
                          } else {
                            console.log(
                              "Updated balance after buy transaction."
                            );
                          }
                        }
                      );
                      // update user wallet, check if coin is in wallet
                      pool.query(
                        "SELECT COUNT(walletid) FROM WALLET WHERE userid = '" +
                          userid +
                          "' AND coin = '" +
                          coin +
                          "'",
                        (err, resBuycount) => {
                          if (err) {
                            console.log("Error - Failed to fetch wallet count");
                            console.log(err);
                          } else {
                            // fetch userid

                            if (parseInt(resBuycount.rows[0].count) == 0) {
                              // insert new entry in wallet
                              pool.query(
                                "INSERT INTO WALLET VALUES (DEFAULT, " +
                                  userid +
                                  ", '" +
                                  coin +
                                  "', " +
                                  quantity +
                                  ")",
                                (err, resBuyupdate) => {
                                  if (err) {
                                    console.log(
                                      "Error - Failed to update new buy balance"
                                    );
                                    console.log(err);
                                  } else {
                                    console.log(
                                      "Created new wallet entry after buy transaction"
                                    );
                                  }
                                }
                              );
                            } else {
                              // get current wallet quantity
                              let newQuantity;
                              pool.query(
                                "SELECT quantity FROM WALLET WHERE userid = '" +
                                  userid +
                                  "' AND coin = '" +
                                  coin +
                                  "'",
                                (err, resBuyquantity) => {
                                  if (err) {
                                    console.log(
                                      "Error - Failed to get quantity of coin"
                                    );
                                    console.log(err);
                                  } else {
                                    newQuantity =
                                      parseFloat(quantity) +
                                      parseFloat(
                                        resBuyquantity.rows[0].quantity
                                      ); // look for actual value in JSON
                                    console.log(
                                      resBuyquantity.rows[0].quantity
                                    );
                                    console.log(newQuantity);
                                    // update wallet with new quantity
                                    console.log(
                                      "UPDATE WALLET SET quantity = " +
                                        newQuantity +
                                        " WHERE userid = " +
                                        userid +
                                        " AND coin = '" +
                                        coin +
                                        "'"
                                    );
                                    pool.query(
                                      "UPDATE WALLET SET quantity = " +
                                        newQuantity +
                                        " WHERE userid = " +
                                        userid +
                                        " AND coin = '" +
                                        coin +
                                        "'",
                                      (err, resBuyupdateQuantity) => {
                                        if (err) {
                                          console.log(
                                            "Error - Failed to update new wallet quantity"
                                          );
                                          console.log(err);
                                        } else {
                                          console.log(
                                            "Updated quantity in wallet after buy transaction"
                                          );
                                          sendMsg =
                                            "Transaction Completed Successfully";
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
  setTimeout((val) => {
    res.send(sendMsg);
  }, 3000);
});

/*
  Sell API:
  User wants to sell some amount of coin
  Before sell:
    user has enough to sell
  During sell:
    update wallet for user
      if remaining quantity is 0, then delete entry in wallet
    add sell entry to transaction table
    update user balance  (convert coin value to balance value)
    clean table.
  
*/
app.put("/api/sell/", (req, res) => {
  let sub = req.query.sub;
  let coin = req.query.coin; // need to initialize
  let priceIndex = dict[coin]; // fetch from API
  let quantity = req.query.quantity; // initialize.
  let userid;
  let sendMsg = "Not Enough Coins to Sell";
  let ownedQuantity; // coin-to-sell's quantity from wallet
  pool.query(
    "SELECT balance FROM USERS WHERE sub = '" + sub + "'",
    (err, resBuybalance) => {
      if (err) {
        console.log("Error - Failed to fetch balance from Users");
        console.log(err);
      } else {
        pool.query(
          "SELECT userid FROM USERS WHERE sub = '" + sub + "'",
          (err, resBuyuserid) => {
            if (err) {
              console.log("Error - Failed to get userid");
              console.log(err);
            } else {
              userid = resBuyuserid.rows[0].userid;
              // check if there are sufficient coins
              pool.query(
                "SELECT quantity FROM WALLET WHERE userid = " +
                  userid +
                  " AND coin = '" +
                  coin +
                  "'",
                (err, resSellquantity) => {
                  if (err) {
                    console.log(
                      "Error - Failed to get coin quantity from wallet"
                    );
                    console.log(err);
                  } else {
                    console.log(resSellquantity.rows);
                    if (resSellquantity.rows.length != 0) {
                      ownedQuantity = parseFloat(
                        resSellquantity.rows[0].quantity
                      );
                      quantity = parseFloat(quantity);
                      console.log(ownedQuantity);
                      console.log(quantity);
                      if (ownedQuantity < quantity) {
                        // if user wants to sell more than they own
                        // exit
                        console.log("hahahaha you dont own enough srub");
                      } else {
                        // user has enough of the coin to sell
                        // SELL OPERATION
                        // update user wallet = ownedQUantity - quantity
                        let newOwnedquantity =
                          parseFloat(ownedQuantity) - parseFloat(quantity);
                        if (newOwnedquantity == 0) {
                          // user no longer owns coin, remove from wallet
                          pool.query(
                            "DELETE FROM WALLET WHERE userid = " +
                              userid +
                              " AND coin = '" +
                              coin +
                              "'",
                            (err, resSelldeleteZero) => {
                              if (err) {
                                console.log(
                                  "Error - Failed to remove coin with new quantity of zero"
                                );
                                console.log(err);
                              } else {
                                console.log(
                                  "UserID " +
                                    userid +
                                    " has " +
                                    newOwnedquantity +
                                    " of " +
                                    coin +
                                    " after selling " +
                                    quantity +
                                    ", removed entry from wallet."
                                );
                                sendMsg =
                                  "UserID " +
                                  userid +
                                  " has " +
                                  newOwnedquantity +
                                  " of " +
                                  coin +
                                  " after selling " +
                                  quantity;
                              }
                            }
                          );
                        } else {
                          // newOwnedquantity > 0, update wallet
                          pool.query(
                            "UPDATE WALLET SET QUANTITY = " +
                              newOwnedquantity +
                              " WHERE userid = " +
                              userid +
                              " AND coin = '" +
                              coin +
                              "'",
                            (err, resSellupdateWallet) => {
                              if (err) {
                                console.log(
                                  "Error - Failed to update wallet with new quantity during selling"
                                );
                                console.log(err);
                              } else {
                                console.log(
                                  "UserID " +
                                    userid +
                                    " has " +
                                    newOwnedquantity +
                                    " of " +
                                    coin +
                                    " after selling " +
                                    quantity
                                );
                                sendMsg =
                                  "UserID " +
                                  userid +
                                  " has " +
                                  newOwnedquantity +
                                  " of " +
                                  coin +
                                  " after selling " +
                                  quantity;
                              }
                            }
                          );
                        }
                        // add sell entry to transaction table
                        pool.query(
                          "INSERT INTO TRANSACTION VALUES (DEFAULT, " +
                            userid +
                            ", '" +
                            coin +
                            "', " +
                            quantity +
                            ", NOW(), false, " +
                            coinValues[priceIndex] +
                            ")",
                          (err, resSellinsert) => {
                            if (err) {
                              console.log(
                                "Error - Failed to insert new sell transaction"
                              );
                              console.log(err);
                            } else {
                              console.log(
                                "Added sell entry to transaction table for user " +
                                  userid +
                                  " selling " +
                                  quantity +
                                  " " +
                                  coin
                              );
                            }
                          }
                        );
                        // update user balance
                        let oldBalance;
                        pool.query(
                          "SELECT balance FROM USERS WHERE userid = " + userid,
                          (err, resSelloldBalance) => {
                            if (err) {
                              console.log(
                                "Error - Failed to fetch user balance"
                              );
                              console.log(err);
                            } else {
                              oldBalance = resSelloldBalance.rows[0].balance;
                              let newBalance =
                                parseFloat(oldBalance) +
                                parseFloat(quantity * coinValues[priceIndex]);
                              pool.query(
                                "UPDATE USERS SET balance = " +
                                  newBalance +
                                  " WHERE userid = " +
                                  userid,
                                (err, resSelluserBalanceupdate) => {
                                  if (err) {
                                    console.log(
                                      "Error - Failed to update user with new balance during selling"
                                    );
                                    console.log(err);
                                  } else {
                                    console.log(
                                      "UserID " +
                                        userid +
                                        " has " +
                                        newOwnedquantity +
                                        " of " +
                                        coin +
                                        " after selling " +
                                        quantity
                                    );
                                    sendMsg =
                                      "UserID " +
                                      userid +
                                      " has " +
                                      newOwnedquantity +
                                      " of " +
                                      coin +
                                      " after selling " +
                                      quantity;
                                    pool.query(
                                      "DELETE FROM WALLET WHERE quantity = 0",
                                      (err, resSellcleanWallet) => {
                                        if (err) {
                                          console.log(
                                            "Error - Failed to clean Wallet of zero quantity values"
                                          );
                                          console.log(err);
                                        } else {
                                          console.log(
                                            "Succesfully cleaned wallet table of zero quantity values."
                                          );
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  }
                }
              );
            }
          }
        );
      }
    }
  );
  setTimeout((val) => {
    res.send(sendMsg);
  }, 3000);
});

app.get("/api/owned", cors(), (req, res) => {
  let sub = req.query.sub;
  let userid;
  let ownedCoinsExternal = [
    { label: "BTC", value: coinValues[0], owned: "0" },
    { label: "ETH", value: coinValues[1], owned: "0" },
    { label: "DOGE", value: coinValues[2], owned: "0" },
    { label: "LTC", value: coinValues[3], owned: "0" },
  ];
  pool.query(
    "SELECT userid FROM USERS WHERE sub = '" + sub + "'",
    (err, resGetuserID) => {
      if (err) {
        console.log("Error - Failed to get userid");
        console.log(err);
      } else {
        userid = resGetuserID.rows[0].userid;
        console.log(userid);
        pool.query(
          "SELECT quantity FROM WALLET WHERE userid = " +
            userid +
            " AND coin = 'BTC'",
          (err, resGetBTC) => {
            if (err) {
              console.log("Error - Failed to get quantity for BTC");
              console.log(err);
            } else {
              if (resGetBTC.rows.length > 0) {
                ownedCoinsExternal[0].owned = resGetBTC.rows[0].quantity;
              }
              pool.query(
                "SELECT quantity FROM WALLET WHERE userid = " +
                  userid +
                  " AND coin = 'ETH'",
                (err, resGetBTC) => {
                  if (err) {
                    console.log("Error - Failed to get quantity for ETH");
                    console.log(err);
                  } else {
                    if (resGetBTC.rows.length > 0) {
                      ownedCoinsExternal[1].owned = resGetBTC.rows[0].quantity;
                    }
                    pool.query(
                      "SELECT quantity FROM WALLET WHERE userid = " +
                        userid +
                        " AND coin = 'DOGE'",
                      (err, resGetBTC) => {
                        if (err) {
                          console.log(
                            "Error - Failed to get quantity for DOGE"
                          );
                          console.log(err);
                        } else {
                          console.log(resGetBTC.rows);
                          if (resGetBTC.rows.length > 0) {
                            ownedCoinsExternal[2].owned =
                              resGetBTC.rows[0].quantity;
                          }
                          pool.query(
                            "SELECT quantity FROM WALLET WHERE userid = " +
                              userid +
                              " AND coin = 'LTC'",
                            (err, resGetBTC) => {
                              if (err) {
                                console.log(
                                  "Error - Failed to get quantity for LTC"
                                );
                                console.log(err);
                              } else {
                                if (resGetBTC.rows.length > 0) {
                                  ownedCoinsExternal[3].owned =
                                    resGetBTC.rows[0].quantity;
                                }
                                res.json({ message: ownedCoinsExternal });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.get("/api/history", cors(), (req, res) => {
  let sub = req.query.sub;
  let userid;
  let tableData = [
    { label: "BTC", orders: [] },
    { label: "ETH", orders: [] },
    { label: "DOGE", orders: [] },
    { label: "LTC", orders: [] },
  ];
  pool.query(
    "SELECT userid FROM USERS WHERE sub = '" + sub + "'",
    (err, resGetuserID) => {
      if (err) {
        console.log("Error - Failed to get userid");
        console.log(err);
      } else {
        userid = resGetuserID.rows[0].userid;
        console.log("USER ID: " + userid);
        pool.query(
          "SELECT type, date, marketprice, quantity FROM TRANSACTION WHERE coin = 'BTC' AND userid = '" +
            userid +
            "'",
          (err, resBTC) => {
            if (err) {
              console.log("Error - Failed to get BTC transactions");
              console.log(err);
            } else {
              tableData[0].orders = resBTC.rows;
              for (let i = 0; i < tableData[0].orders.length; i++) {
                if (tableData[0].orders[i].type) {
                  tableData[0].orders[i].type = "Buy";
                } else {
                  tableData[0].orders[i].type = "Sell";
                }
              }
              pool.query(
                "SELECT type, date, marketprice, quantity FROM TRANSACTION WHERE coin = 'ETH' AND userid = '" +
                  userid +
                  "'",
                (err, resETH) => {
                  if (err) {
                    console.log("Error - Failed to get ETH transactions");
                    console.log(err);
                  } else {
                    tableData[1].orders = resETH.rows;
                    for (let i = 0; i < tableData[1].orders.length; i++) {
                      if (tableData[1].orders[i].type) {
                        tableData[1].orders[i].type = "Buy";
                      } else {
                        tableData[1].orders[i].type = "Sell";
                      }
                    }
                    pool.query(
                      "SELECT type, date, marketprice, quantity FROM TRANSACTION WHERE coin = 'DOGE' AND userid = '" +
                        userid +
                        "'",
                      (err, resDOGE) => {
                        if (err) {
                          console.log(
                            "Error - Failed to get DOGE transactions"
                          );
                          console.log(err);
                        } else {
                          tableData[2].orders = resDOGE.rows;
                          for (let i = 0; i < tableData[2].orders.length; i++) {
                            if (tableData[2].orders[i].type) {
                              tableData[2].orders[i].type = "Buy";
                            } else {
                              tableData[2].orders[i].type = "Sell";
                            }
                          }
                          pool.query(
                            "SELECT type, date, marketprice, quantity FROM TRANSACTION WHERE coin = 'LTC' AND userid = '" +
                              userid +
                              "'",
                            (err, resLTC) => {
                              if (err) {
                                console.log(
                                  "Error - Failed to get LTC transactions"
                                );
                                console.log(err);
                              } else {
                                tableData[3].orders = resLTC.rows;
                                for (
                                  let i = 0;
                                  i < tableData[3].orders.length;
                                  i++
                                ) {
                                  if (tableData[3].orders[i].type) {
                                    tableData[3].orders[i].type = "Buy";
                                  } else {
                                    tableData[3].orders[i].type = "Sell";
                                  }
                                }
                                res.json({ message: tableData });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.get("/api/balance", cors(), (req, res) => {
  let sub = req.query.sub;
  pool.query(
    "SELECT balance FROM USERS WHERE sub = '" + sub + "'",
    (err, resBuybalance) => {
      res.send(resBuybalance.rows[0].balance);
    }
  );
});

app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  // res.json({ message: "Hello from server!" });
  // console.log('hello from the server')
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
