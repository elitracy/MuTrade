import pandas
import json

dtypes = {
  'Unix Timestamp': 'str', 
  'Date': 'str', 
  'Symbol': 'str', 
  'Open': 'float', 
  'High': 'float', 
  'Low': 'float',
  'Close': 'float',
  'Volume': 'float'}

#mm/dd/yyyy
def goldencross(start_date, end_date, start_usd, coin):
  df = pandas.read_csv('data/gemini_BTCUSD_2019_1min.csv', dtype=dtypes)
  # reverse dataframe
  df = df.reindex(index=df.index[::-1])
  # drop last row (contains junk)
  df.drop(df.tail(1).index, inplace=True)

  df2 = pandas.read_csv('data/gemini_BTCUSD_2020_1min.csv', dtype=dtypes)
  df2 = df2.reindex(index=df2.index[::-1])
  df2.drop(df2.tail(1).index, inplace=True)

  df = df.append(df2, ignore_index=True)

  # df.iloc[i][0] gives close price for some reason which is what I use
  # first row is column titles

  smallMA = 0
  bigMA = 0

  smallMA_size = 50 * 1440
  bigMA_size = 200 * 1440

  for i in range(bigMA_size - smallMA_size, bigMA_size):
    smallMA += df.iloc[i]['Open'] / smallMA_size

  for i in range(0, bigMA_size):
    bigMA += df.iloc[i]['Open'] / bigMA_size


  btc = 0
  usd = start_usd

  ATH = start_usd
  ATL = start_usd
  gain = 0
  tradeVol = 0
  totalNetProfit = 0
  netGain = 0
  Buys = 0
  Sells = 0
  Trades = 0
  netLoss = 0

  portfolio_tracker = []
  for i in range(1, bigMA_size // 1440):
    portfolio_tracker.append(start_usd)

  last_usd = 0
  btc_vol = 0
  comp = bigMA > smallMA
  for i in range(bigMA_size, df.shape[0]):
    bigMA -= df.iloc[i - bigMA_size]['Open'] / bigMA_size
    bigMA += df.iloc[i]['Open'] / bigMA_size
    smallMA -= df.iloc[i - smallMA_size]['Open'] / smallMA_size
    smallMA += df.iloc[i]['Open'] / smallMA_size
    if (bigMA > smallMA) != comp:
      comp = bigMA > smallMA
      if not comp and usd > 0:
        # buy btc
        last_usd = usd
        btc += usd / df.iloc[i]['Open']
        usd = 0
        
        btc_vol = btc
        
        Buys += 1
        tradeVol += btc_vol

      elif comp and btc > 0:
        # sell btc
        usd += btc * df.iloc[i]['Open']
        btc = 0

        if usd > last_usd:
          netGain += usd - last_usd
        else:
          netLoss += usd - last_usd
        Sells += 1
        tradeVol += btc_vol

    if btc * df.iloc[i]['Open'] + usd > ATH:
      ATH = btc * df.iloc[i]['Open'] + usd
    elif btc * df.iloc[i]['Open'] + usd < ATL:
      ATL = btc * df.iloc[i]['Open'] + usd
    if i % 1440 == 0:
      portfolio_tracker.append(btc * df.iloc[i]['Open'] + usd)


  ATH = round(ATH, 2)
  ATL = round(ATL, 2)
  end_usd = btc * df.iloc[df.shape[0] - 1]['Open'] + usd
  gain = round((end_usd - start_usd) / start_usd, 2)
  tradeVol = round(tradeVol, 2)
  totalNetProfit = round(end_usd - start_usd, 2)
  netGain = round(netGain, 2)
  Trades = Buys + Sells
  netLoss = round(netLoss, 2)

  performance_data = {
    "coin" : coin,
    "id" : 1,
    "startDate" : start_date,
    "endDate" : end_date,
    "startingAmount" : start_usd,
    "algorithmName" : "Golden Cross",
    "graphData" : portfolio_tracker,
    "ATH" : ATH,
    "ATL" : ATL,
    "gain" : gain,
    "tradeVol" : tradeVol,
    "totalNetProfit" : totalNetProfit,
    "netGain" : netGain,
    "Buys" : Buys,
    "Sells" : Sells,
    "Trades" : Trades,
    "netLoss" : netLoss,
  }

  with open('result.json', 'w') as outfile:
      json.dump(performance_data, outfile)