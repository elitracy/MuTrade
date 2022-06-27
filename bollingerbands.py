import pandas
import math
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

def bollingerbands(start_date, end_date, start_usd, coin):
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

  const_MA = 0
  topband = 0
  botband = 0
  MA_size = 20 * 1440
  diff = []
  diff_sum = 0
  squared_diff = []
  squared_diff_sum = 0
  epsilon = []
  epsilonsum = 0

  for i in range(MA_size):
    const_MA += df.iloc[i]['Open'] / MA_size

  for i in range(MA_size):
    x_minus_mean = df.iloc[i]['Open'] - const_MA
    diff.append(x_minus_mean)
    diff_sum += x_minus_mean
    squared_diff.append(x_minus_mean**2)
    squared_diff_sum += x_minus_mean**2

  sd = math.sqrt(squared_diff_sum / MA_size)

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
  for i in range(1, MA_size // 1440):
    portfolio_tracker.append(start_usd)

  last_usd = 0
  btc_vol = 0
  for i in range(MA_size, df.shape[0] - 1):
    epsilon.append((df.iloc[i]['Open'] - df.iloc[i - MA_size]['Open']) / MA_size)
    epsilonsum += epsilon[len(epsilon) - 1]

    x_minus_mean = df.iloc[i]['Open'] - const_MA
    diff_sum -= diff[len(diff) - MA_size]
    diff.append(x_minus_mean)
    diff_sum += diff[len(diff) - 1]
    squared_diff_sum -= squared_diff[len(squared_diff) - MA_size]
    squared_diff.append(x_minus_mean**2)
    squared_diff_sum += squared_diff[len(squared_diff) - 1]

    sd = math.sqrt(squared_diff_sum / MA_size - 2 * diff_sum * epsilonsum / MA_size + epsilonsum**2)
    new_MA = const_MA + epsilonsum
    topband = new_MA + 2 * sd
    botband = new_MA - 2 * sd

    if df.iloc[i]['Open'] > topband and usd != 0:
      # buy btc
      last_usd = usd
      btc += usd / df.iloc[i]['Open']
      usd = 0
                
      btc_vol = btc
        
      Buys += 1
      tradeVol += btc_vol

    elif df.iloc[i]['Open'] < botband and btc != 0:
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
    "algorithmName" : "Bollinger Bands",
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