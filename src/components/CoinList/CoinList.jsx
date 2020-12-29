import React, { Component } from 'react';
import Coin from '../Coin/Coin';

export default class CoinList extends Component {
    render() {
        return (
            <table className="coin-table">
            <thead>
              <tr>
              <th>Name</th>
              <th>Ticker</th>
              <th>Price</th>
              {this.props.showBalance?<th>Balance</th>:null}
              <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.coinData.map( ({name, ticker, price, balance})  =>  
                  <Coin key={ticker} 
                    handleRefresh={this.props.handleRefresh}
                    name={name} 
                    ticker={ticker} 
                    price={price} 
                    balance={balance} 
                    showBalance={this.props.showBalance} 
                   />
                    
                )
              }
            </tbody>
          </table>
          )
    }
}

