import React from 'react';
import Coin from '../Coin/Coin';

export default function CoinList(props)  {
  return (
      <table className="coin-table">
      <thead>
        <tr>
        <th>Name</th>
        <th>Ticker</th>
        <th>Price</th>
        {props.showBalance?<th>Balance</th>:null}
        <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          props.coinData.map( ({key, name, ticker, price, balance })  =>  
            <Coin key={key} 
              tickerId={key} 
              handleRefresh={props.handleRefresh}
              name={name} 
              ticker={ticker} 
              price={price} 
              balance={balance} 
              showBalance={props.showBalance} 
              />
              
          )
        }
      </tbody>
    </table>
    )

}

